import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../database/database.module';
import { AppointmentsService } from './appointments.service';
import { PatientsService } from './patients.service';

describe('AppointmentsService', () => {
  let appService: AppointmentsService;

  beforeEach(async () => {

    const module: TestingModule = await Test.
      createTestingModule({
        providers: [AppointmentsService, PatientsService],
        imports: [DatabaseModule]
      }).compile();

    appService = module.get<AppointmentsService>(AppointmentsService);
  });

  it('should be defined', () => {
    expect(appService).toBeDefined();
    expect(true).toBeTruthy()
  });
});
