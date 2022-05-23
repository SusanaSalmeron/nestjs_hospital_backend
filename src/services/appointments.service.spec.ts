import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsService } from './appointments.service';
import { PatientsService } from './patients.service';
import { PatientToShow } from '../classes/patientToShow';
import { Patient } from '../classes/patient';
import { CreateAppointmentDto } from 'src/dto/createAppointmentDto';
import { DeleteAppointDto } from 'src/dto/deleteAppointDto';

//TODO test not working properly
describe('AppointmentsService', () => {
  let appointmentsService: AppointmentsService;
  let spyPatientsService: PatientsService;


  let patientMockDbCollection;
  let appointmentMockDbCollection
  let doctorMockDbCollection


  beforeEach(async () => {
    const patientsServiceProvider = {
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
          } else {
            return null
          }
        }
        ),
        addPatientToDB: jest.fn((): boolean => true),
        modifyPatientData: jest.fn((): boolean => true)
      })
    }

    const fakePatientsTableData = [
      {
        "name": "Lareina Tyler",
        "address": "110-9383 Vehicula Avenue",
        "email": "massa.lobortis@nequenullam.ca",
        "postalZip": "4954",
        "region": "Lung Sun",
        "country": "Brazil",
        "phone": "1-433-883-7645",
        "id": 1,
        "dob": "12-02-1971",
        "ssnumber": "8737559DQ",
        "company": "Mauris Eu Company"
      },
      {
        "name": "Britanney Roth",
        "address": "815-8109 Ut, Street",
        "email": "enim.sit.amet@imperdietnecleo.com",
        "postalZip": "91254",
        "region": "Bolvar",
        "country": "Germany",
        "phone": "1-673-490-1922",
        "id": 2,
        "dob": "07-11-1998",
        "ssnumber": "5616744RO",
        "company": "Eu Odio Corp."
      },
    ]

    const fakeAppointmentTableData = [
      {
        "id": 1,
        "doctorId": 4,
        "patientId": 2,
        "pickedDate": "15/10/2021",
      },
      {
        "id": 2,
        "doctorId": 9,
        "patientId": 2,
        "pickedDate": "08/05/2022",
      }
    ]

    const fakeDoctorTableData = [
      {
        "id": 4,
        "name": "Karly Sosa",
        "email": "velit.eu.sem@ipsum.co.uk",
        "speciality": "gynecology",
        "photo": "https://images.pexels.com/photos/7580257/pexels-photo-7580257.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
      },
      {
        "id": 6,
        "name": "Indigo Trevino",
        "email": "nec.eleifend@tempuslorem.net",
        "speciality": "surgery",
        "photo": "https://images.pexels.com/photos/6303556/pexels-photo-6303556.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
      },
      {
        "id": 9,
        "name": "Ulysses Gray",
        "email": "vestibulum.mauris@pedenonummy.com",
        "speciality": "psychiatry",
        "photo": "https://images.pexels.com/photos/8376181/pexels-photo-8376181.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
      }

    ]

    patientMockDbCollection = {
      findOne: jest.fn().mockImplementation((criteria) => {
        if (criteria.id && criteria.id["$eq"]) {
          const targetId = criteria["id"]["$eq"]
          const patient = fakePatientsTableData.filter((fp) => fp.id === targetId)
          return patient.length ? patient : null
        } else if (criteria.id) {
          const patientTargetId = criteria["id"]
          const patient = fakePatientsTableData.filter((fp) => fp.id === patientTargetId)[0]
          return patient ? patient.name : null
        }
        return null
      }),
      find: jest.fn().mockReturnValue(fakePatientsTableData)
    }

    appointmentMockDbCollection = {
      find: jest.fn().mockImplementation((criteria) => {
        if (criteria.patientId) {
          const patientTargetId = criteria["patientId"]["$eq"]
          const appointments = fakeAppointmentTableData.filter((fa) => fa.patientId === patientTargetId)
          return appointments ? appointments : null
        }
        else if (criteria.doctorId) {
          const doctorTargetId = criteria["doctorId"]
          const doctorAppointments = fakeAppointmentTableData.filter((fa) => fa.doctorId === doctorTargetId)
          return doctorAppointments ? doctorAppointments : null
        }
        return null
      }),
      insert: jest.fn(),
      findOne: jest.fn().mockImplementation((criteria) => {
        const targetId = criteria["id"]
        const appointments = fakeAppointmentTableData.filter((fa) => fa.id === targetId)[0]
        return appointments
      }),
      remove: jest.fn()
    }

    doctorMockDbCollection = {
      findOne: jest.fn().mockImplementation((criteria) => {
        const targetId = criteria["id"]
        const doctor = fakeDoctorTableData.filter((fd) => fd.id === targetId)
        return doctor.length ? doctor[0] : null
      })
    }


    const dbProvider = {
      provide: 'DATABASE_CONNECTION',
      useFactory: async () => {
        return {
          getCollection: jest.fn().mockImplementation((tableName) => {
            if (tableName === "patients") {
              return patientMockDbCollection
            }
            if (tableName === "appointments") {
              return appointmentMockDbCollection
            }
            if (tableName === "doctors") {
              return doctorMockDbCollection
            }
          })
        }
      }
    }

    const module: TestingModule = await Test.
      createTestingModule({
        providers: [AppointmentsService, PatientsService, patientsServiceProvider, dbProvider],
      }).compile();

    appointmentsService = module.get<AppointmentsService>(AppointmentsService);
    spyPatientsService = module.get<PatientsService>(PatientsService)
  });

  it('should return null when patientId does not exists', async () => {
    const appointments = await appointmentsService.findAppointmentsByPatient("10003")
    expect(appointments).toBeNull()
  });
  it('should return appointments from a valid patient', async () => {
    const result = await appointmentsService.findAppointmentsByPatient("2")
    expect(patientMockDbCollection.findOne).toHaveBeenCalledWith({ id: { '$eq': 2 } })
    expect(appointmentMockDbCollection.find).toHaveBeenCalledWith({ patientId: { '$eq': 2 } })
    expect(doctorMockDbCollection.findOne).toHaveBeenCalledWith({ id: 4 })
    expect(result).toContainEqual(
      {
        id: 1,
        pickedDate: '15/10/2021',
        doctor: 'Karly Sosa',
        doctorId: 4
      }
    )
  })
  it('should return an empty array when a valid patient has no appoitments', async () => {
    const result = await appointmentsService.findAppointmentsByPatient("1"
    )
    expect(patientMockDbCollection.findOne).toHaveBeenCalledWith({ id: { '$eq': 1 } })
    expect(appointmentMockDbCollection.find).toHaveBeenCalledWith({ patientId: { '$eq': 1 } })
    expect(doctorMockDbCollection.findOne).not.toHaveBeenCalled()
    expect(result).toHaveLength(0)
  })
  it("should return an empty array when a valid doctor has no appointments", async () => {
    const result = await appointmentsService.findAppointmentsFromDoctor("6")
    expect(appointmentMockDbCollection.find).toHaveBeenCalledWith({ doctorId: 6 })
    expect(doctorMockDbCollection.findOne).not.toHaveBeenCalled()
    expect(result).toHaveLength(0)
  })
  it('should create a new appointment from a valid patient', async () => {
    const newAppointment: CreateAppointmentDto = { pickedDate: "10/05/2022", doctor: 4 }
    const result = await appointmentsService.createNewAppointment("1", newAppointment)
    expect(spyPatientsService.findById).toHaveBeenCalled()
    expect(doctorMockDbCollection.findOne).toHaveBeenCalledWith({ id: 4 })
    expect(appointmentMockDbCollection.insert).toHaveBeenCalled()
    expect(result).toEqual(1000)
  })
  it('should not create a new appointment from a non valid patient', async () => {
    const newAppointment: CreateAppointmentDto = { pickedDate: "10/05/2022", doctor: 4 }
    const result = await appointmentsService.createNewAppointment("15", newAppointment)
    expect(result).toBeNull()

  })
  it('should delete an appointment from a valid patient', async () => {
    const fakeAppointment: DeleteAppointDto = { id: "2", appId: "1" }
    const result = await appointmentsService.deleteAppointment(fakeAppointment)
    expect(result).toBeTruthy()
  })
})
