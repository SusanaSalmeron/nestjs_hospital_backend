import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from '../../services/email.service';
import { ManagementService } from '../../services/management.service';
import { ManagementController } from './management.controller';
import { CreateContactUsDto } from '../../dto/createContactUsDto'

describe('ManagementController Unit Test', () => {
  let managementController: ManagementController;
  let spyManagementService: ManagementService;
  let spyEmailService: EmailService;

  const response = {
    send: jest.fn().mockReturnThis(),
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
  }

  const body: CreateContactUsDto = {
    id: 1,
    name: "Susana Salmeron",
    email: "exdream76@gmail.com",
    subject: "Consulta sobre vacunación",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }

  beforeEach(async () => {
    const managementServiceProvider = {
      provide: ManagementService,
      useFactory: () => ({
        addQueryToDB: jest.fn((): boolean => true)
      })
    }
    const emailServiceProvider = {
      provide: EmailService,
      useFactory: () => ({
        sendEmail: jest.fn((): boolean => true)
      })
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManagementController],
      providers: [ManagementService, EmailService, managementServiceProvider, emailServiceProvider],
    }).compile();
    managementController = module.get<ManagementController>(ManagementController);
    spyManagementService = module.get<ManagementService>(ManagementService);
    spyEmailService = module.get<EmailService>(EmailService);
  });
  it('calling contactUs method', async () => {
    await managementController.contactUs(response, body)
    expect(spyManagementService.addQueryToDB).toHaveBeenCalled()
    expect(spyEmailService.sendEmail).toHaveBeenCalled()
    expect(response.status).toHaveBeenCalledWith(201)
    expect(response.json).toBeTruthy()
    expect(response.send).not.toHaveBeenCalled()
  });
});
