import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsService } from '../../services/appointments.service';
import { RecordsService } from '../../services/records.service';
import { PatientsService } from '../../services/patients.service';
import { PatientsController } from './patients.controller';
import { ModifyPatientDataDto } from '../../dto/modifyPatientDataDto';
import { CreateAppointmentDto } from '../../dto/createAppointmentDto';
import { CreateRecordDto } from '../../dto/createRecordDto';
import { Patient } from '../../classes/patient'
import { PatientToShow } from '../../classes/patientToShow';
import { ClinicalRecord } from '../../classes/clinicalRecord';
import { Appointment } from '../../classes/appointment';
import { DoctorAppointment } from '../../classes/doctorAppointment';

describe('PatientsController Unit test', () => {
  let patientsController: PatientsController;
  let spyPatientsService: PatientsService;
  let spyAppointmentsService: AppointmentsService;
  let spyRecordsService: RecordsService;

  const keyword = ""
  const id = "1"
  const response = {
    send: jest.fn(),
    status: jest.fn(),
    json: jest.fn()
  }
  const modifyBody: ModifyPatientDataDto = {
    name: "Andrew",
    email: "andrew@gmail.com",
    address: "Portazgo, 8",
    postalZip: "28013",
    region: "Madrid",
    country: "Spain",
    phone: "697568598",
    ssnumber: "dsfgdhfjgrtey",
    company: "adeslas",
  }
  const createBody: CreateAppointmentDto = {
    pickedDate: "08/05/2022",
    doctor: 4
  }

  const recordBody: CreateRecordDto = {
    diagnostics: "cold",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
  }
  const request = { role: "sanitario" }

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
        )]),
        findById: jest.fn(() => new Patient(
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
        )),
        addPatientToDB: jest.fn(() => true),
        modifyPatientData: jest.fn(() => true)
      })
    }
    const appointmentsServiceProvider = {
      provide: AppointmentsService,
      useFactory: () => ({
        findAppointmentsByPatient: jest.fn(() => [new Appointment(
          1,
          4,
          10003,
          "15/10/2021"
        ),
        new Appointment(
          2,
          5,
          10003,
          "15/10/2022"
        )]),
        findAppointmentsFromDoctor: jest.fn(() => [new DoctorAppointment(
          1,
          4,
          10003,
          "Mary",
          "15/10/2021"
        ),
        new DoctorAppointment(
          3,
          4,
          10004,
          "Peter",
          "15/10/2022"
        )]),
        createNewAppointment: jest.fn(() => 40),
        deleteAppointment: jest.fn(() => true)
      })
    }
    const recordsServiceProvider = {
      provide: RecordsService,
      useFactory: () => ({
        findRecordsByPatient: jest.fn(() => [new ClinicalRecord(
          "Jennifer",
          "Gran Via 8",
          "Adeslas",
          "09/01/1990",
          [
            {
              recordId: 1,
              date: "01/06/2022",
              id: 3,
              description: "Phasellus dolor elit, pellentesque a, facilisis non, bibendum sed, est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed dictum eleifend, nunc risus varius orci, in consequat enim diam vel arcu",
              diagnostics: "asthma, diarrhea, cirrhosis"
            }
          ])
        ])
      }),
      addNewRecord: jest.fn(() => true)
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientsController],
      providers: [PatientsService, RecordsService, AppointmentsService, appointmentsServiceProvider, recordsServiceProvider, patientServiceProvider]
    }).compile();

    patientsController = module.get<PatientsController>(PatientsController);
    spyAppointmentsService = module.get<AppointmentsService>(AppointmentsService);
    spyPatientsService = module.get<PatientsService>(PatientsService);
    spyRecordsService = module.get<RecordsService>(RecordsService)
  });

  it('should return valid patients when getPatientBy is called', async () => {
    await patientsController.getPatientsBy(keyword, response)
    expect(spyPatientsService.findBy).toHaveBeenCalled()
    expect(response.status).toHaveBeenCalledWith(200)
    expect(response.json).toHaveBeenCalledWith([new PatientToShow(
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
    )])
    expect(response.send).not.toHaveBeenCalled()
  });

  it('should return a valid patient when getPatientById is called', async () => {
    await patientsController.getPatientById(id, response)
    expect(spyPatientsService.findById).toHaveBeenCalled()
    expect(response.status).toHaveBeenCalledWith(200)
    expect(response.json).toHaveBeenCalledWith(new Patient(
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
    ))
    expect(response.send).not.toHaveBeenCalled()
  })
  it('should update a valid patient when updatePatientData is called', async () => {
    await patientsController.updatePatientData(id, response, modifyBody)
    expect(spyPatientsService.modifyPatientData).toHaveBeenCalled()
    expect(response.status).toHaveBeenCalledWith(200)
    expect(response.json).toBeTruthy()
    expect(response.send).not.toHaveBeenCalled()
  })
  it('should show appointments from a valid patient when getAppointmentsByPatient is called', async () => {
    await patientsController.getAppointmentsByPatient(id, response)
    expect(spyAppointmentsService.findAppointmentsByPatient).toHaveBeenCalled()
    expect(response.status).toHaveBeenCalledWith(200)
    expect(response.json).toHaveBeenCalledWith([new Appointment(
      1,
      4,
      10003,
      "15/10/2021"
    ),
    new Appointment(
      2,
      5,
      10003,
      "15/10/2022"
    )])
    expect(response.send).not.toHaveBeenCalled()
  })

});
