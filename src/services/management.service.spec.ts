import { Test, TestingModule } from '@nestjs/testing';
import { CreateContactUsDto } from '../dto/createContactUsDto';
import { ManagementService } from './management.service';

describe('ManagementService', () => {
  let managementService: ManagementService;

  let managementMockDbCollection

  beforeEach(async () => {
    managementMockDbCollection = {
      insert: jest.fn(),
    }

    const dbProvider = {
      provide: 'DATABASE_CONNECTION',
      useFactory: () => {
        return {
          getCollection: jest.fn().mockReturnValue(managementMockDbCollection)
        }
      }
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagementService, dbProvider],
    }).compile();

    managementService = module.get<ManagementService>(ManagementService);
  });

  it('should add query to Database', async () => {
    const contactUs: CreateContactUsDto = {
      id: 15, name: "Jane Smith", email: "janeS@gmail.com", subject: "Question about flu vaccination", message: "Aenean sed pede nec ante blandit viverra."
    }
    const result = await managementService.addQueryToDB(contactUs)
    expect(managementMockDbCollection.insert).toHaveBeenCalledWith({
      id: 4, name: "Jane Smith", email: "janeS@gmail.com", subject: "Question about flu vaccination", message: "Aenean sed pede nec ante blandit viverra."
    })
    expect(result).toEqual(true)
  });
});
