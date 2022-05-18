import { Test, TestingModule } from '@nestjs/testing';
import { ValidationService } from './validation.service';


describe('ValidationService', () => {
  let validationService: ValidationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidationService],
    }).compile();

    validationService = module.get<ValidationService>(ValidationService);
  });

  it('should be false when pass a non valid email', async () => {
    const result = await validationService.validateEmail('exdream@gma')
    expect(result).toBeFalsy()
  });
  it('should be true when pass a valid email', async () => {
    const result = await validationService.validateEmail('exdream@gmail.com')
    expect(result).toBeTruthy()
  });
  it('should be false when pass a non valid password', async () => {
    const result = await validationService.validatePassword('123')
    expect(result).toBeFalsy()
  });
  it('should be true when pass a valid password', async () => {
    const result = await validationService.validatePassword('12345ABc!')
    expect(result).toBeTruthy()
  });

})