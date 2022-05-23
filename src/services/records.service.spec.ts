import { Test, TestingModule } from '@nestjs/testing';
import { PatientsService } from './patients.service';
import { RecordsService } from './records.service';
import { PatientToShow } from '../classes/patientToShow';
import { Patient } from '../classes/patient';
import { ClinicalRecord } from '../classes/clinicalRecord';
import { Record } from '../classes/record'

describe('ServicesService', () => {
  let clinicalRecordsService: RecordsService;
  let spyPatientsService: PatientsService

  let clinicalRecordsMockCollection

  beforeEach(async () => {
    const patientServiceProvider = {
      provide: PatientsService,
      useFactory: () => ({
        findBy: jest.fn(() => [new PatientToShow(
          "Peter",
          "Fuencarral 2",
          "peter@gmail.com",
          "28004",
          "Madrid",
          "Spain",
          "667856433",
          1,
          "14/09/2000",
          "8796590",
          "Adeslas",
          "Cold"
        ),
        new PatientToShow(
          "Ann",
          "Fuencarral 8",
          "Ann@gmail.com",
          "28004",
          "Madrid",
          "Spain",
          "667856434",
          2,
          "15/08/2000",
          "8796591",
          "Adeslas",
          "Cold"
        )]),
        findById: jest.fn((id) => {
          if (id === "1") {
            return new Patient(
              "Peter",
              "Fuencarral 2",
              "peter@gmail.com",
              "28004",
              "Madrid",
              "Spain",
              "667856433",
              1,
              "14/09/2000",
              "8796590",
              "Adeslas"
            )
          }
          if (id === "2") {
            return new Patient(
              "Ann",
              "Fuencarral 8",
              "Ann@gmail.com",
              "28004",
              "Madrid",
              "Spain",
              "667856434",
              2,
              "15/08/2000",
              "8796591",
              "Adeslas",
            )
          } else {
            return null
          }
        }),
        addPatientToDB: jest.fn((): boolean => true),
        modifyPatientData: jest.fn((): boolean => true)
      })
    }

    const fakeClinicalRecordsTableData = [
      {
        "recordId": 1,
        "date": "01-01-2010",
        "id": 1,
        "description": "malesuada vel",
        "diagnostics": "covid-19"
      }
    ]

    clinicalRecordsMockCollection = {
      find: jest.fn().mockImplementation((criteria) => {
        const fakePatientId = criteria["id"]
        const clinicalRecords = fakeClinicalRecordsTableData.filter((cr) =>
          cr.id === fakePatientId)
        return clinicalRecords ? clinicalRecords : null

      })
    }
    const dbProvider = {
      provide: "DATABASE_CONNECTION",
      useFactory: () => {
        return {
          getCollection: jest.fn().mockReturnValue(clinicalRecordsMockCollection)
        }
      }
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [RecordsService, PatientsService, patientServiceProvider, dbProvider],
    }).compile();

    clinicalRecordsService = module.get<RecordsService>(RecordsService);
    spyPatientsService = module.get<PatientsService>(PatientsService)

  });

  it('should return a patient without records when patient has not records', async () => {
    const result = await clinicalRecordsService.findRecordsByPatient("2")
    expect(spyPatientsService.findById).toHaveBeenCalledWith("2")
    expect(clinicalRecordsMockCollection.find).toHaveBeenCalledWith({ id: 2 })
    expect(result).toEqual(
      new ClinicalRecord(
        "Ann",
        "Fuencarral 8",
        "Adeslas",
        "15/08/2000",
        []
      ))
  });
  it('should return a patient with records when patient has records', async () => {
    const result = await clinicalRecordsService.findRecordsByPatient("1")
    expect(spyPatientsService.findById).toHaveBeenCalledWith("1")
    expect(clinicalRecordsMockCollection.find).toHaveBeenCalledWith({ id: 1 })
    expect(result).toEqual(
      new ClinicalRecord(
        "Peter",
        "Fuencarral 2",
        "Adeslas",
        "14/09/2000",
        [new Record(
          1,
          "01-01-2010",
          1,
          "malesuada vel",
          "covid-19"
        )]
      ))

  })
});
