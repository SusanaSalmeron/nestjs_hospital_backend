import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from './token.service';

describe('TokenService', () => {
  let tokenService: TokenService;
  let configService: ConfigService;


  const fakeUser = {
    role: "sanitario",
    id: 1
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenService, {
        provide: ConfigService,
        useValue: {
          get: jest.fn(() => {
            return "secret key"
          })
        }
      }],
    }).compile();

    tokenService = module.get<TokenService>
      (TokenService);
    configService = module.get<ConfigService>(ConfigService)
  });

  it('should create a token ', async () => {
    const result = await tokenService.createToken(fakeUser)
    expect(tokenService.createToken).toBeTruthy()
    console.log(result)
    expect(configService.get).toHaveBeenCalled()
  });
});
