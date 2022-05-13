import { Test, TestingModule } from '@nestjs/testing';
import { DoctorAppointment } from '../../classes/doctorAppointment';
import { Appointment } from '../../classes/appointment';
import { AppointmentsService } from '../../services/appointments.service';
import { DoctorsController } from './doctors.controller';

describe('DoctorsController Unit Tests', () => {
  let doctorsController: DoctorsController;
  let spyAppointmentsService: AppointmentsService;

  const id = "4"
  const response = {
    send: jest.fn().mockReturnThis(),
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
  }

  beforeEach(async () => {
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
        )
        ]),
        createNewAppointment: jest.fn((): number => 40),
        deleteAppointment: jest.fn((): boolean => true)
      })
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorsController],
      providers: [AppointmentsService, appointmentsServiceProvider]
    }).compile();

    doctorsController = module.get<DoctorsController>(DoctorsController);
    spyAppointmentsService = module.get<AppointmentsService>(AppointmentsService)
  });

  it('should return valid appointments from getAppointmentsFromDoctor', async () => {
    await doctorsController.getAppointmentsFromDoctor(id, response)
    expect(spyAppointmentsService.findAppointmentsFromDoctor).toHaveBeenCalled()
    expect(response.status).toHaveBeenCalledWith(200)
    expect(response.json).toHaveBeenCalledWith([new DoctorAppointment(
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
    )])
    expect(response.send).not.toHaveBeenCalled()
  });
});
