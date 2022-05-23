import { Test, TestingModule } from '@nestjs/testing';
import { PatientsService } from '../../services/patients.service';
import { TokenService } from '../../services/token.service';
import { ValidationService } from '../../services/validation.service';
import { UsersService } from '../../services/users.service';
import { UsersController } from './users.controller';
import { Patient } from '../../classes/patient';
import { PatientToShow } from '../../classes/patientToShow';
import { User } from '../../classes/user';

describe('UserController Unit Tests', () => {
  let usersController: UsersController;
  let spyUsersService: UsersService;
  let spyTokenService: TokenService;
  let spyPatientsService: PatientsService;
  let spyValidationService: ValidationService

  const response = {
    send: jest.fn().mockReturnThis(),
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
  }

  const newResponse = () => {
    return {
      send: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }
  }

  const loginBody = {
    password: "121345AB!",
    email: "Peter@gmail.com"
  }

  const signupBody = {
    email: "Ana@gmail.com",
    password: "121345CD!",
    name: "Ana Garcia",
    address: "Gran Via 80",
    postalZip: "28013",
    region: "Madrid",
    country: "Spain",
    phone: "669873376",
    dob: "09/01/1998",
    ssnumber: "q2w3456hgbhj",
    company: "Sanitas"
  }

  beforeEach(async () => {
    const usersServiceProvider = {
      provide: UsersService,
      useFactory: () => ({
        findUserByEmail: jest.fn(() => new User(
          "Peter",
          "Peter@gmail.com",
          "121345AB!",
          "sanitario",
          1
        )),
        signup: jest.fn((): number => 3)
      })
    }

    const tokenServiceProvider = {
      provide: TokenService,
      useFactory: () => ({
        createToken: jest.fn((): string => "sñdhgñjfshgskldfsklsdklf47809")
      })
    }

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
        addPatientToDB: jest.fn((): boolean => true),
        modifyPatientData: jest.fn((): boolean => true)
      })
    }

    const validationServiceProvider = {
      provide: ValidationService,
      useFactory: () => ({
        validateEmail: jest.fn((): boolean => true),
        validatePassword: jest.fn((): boolean => true)
      })
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, TokenService, ValidationService, PatientsService, usersServiceProvider, tokenServiceProvider, validationServiceProvider, patientsServiceProvider]
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    spyPatientsService = module.get<PatientsService>(PatientsService)
    spyTokenService = module.get<TokenService>(TokenService)
    spyUsersService = module.get<UsersService>(UsersService)
    spyValidationService = module.get<ValidationService>(ValidationService)
  });

  it('should login an existent user when userLogin is called', async () => {
    await usersController.userLogin(response, loginBody)
    expect(spyUsersService.findUserByEmail).toHaveBeenCalledWith("Peter@gmail.com")
    expect(response.status).toHaveBeenCalledWith(200)
    expect(response.json).toHaveBeenCalledWith({
      name: "Peter",
      id: 1,
      token: "sñdhgñjfshgskldfsklsdklf47809"
    })
    expect(response.send).not.toHaveBeenCalled()
  });

  it('should register a non existent user when userSignup is called', async () => {
    const mockResponse = newResponse()
    await usersController.userSignup(mockResponse, signupBody)
    expect(spyValidationService.validateEmail).toBeTruthy()
    expect(spyValidationService.validatePassword).toBeTruthy()
    expect(spyUsersService.signup).toHaveBeenCalledWith("Ana@gmail.com", "121345CD!", "Ana Garcia")
    expect(spyPatientsService.addPatientToDB).toHaveBeenCalled()
    expect(spyTokenService.createToken).toHaveBeenCalled()
    expect(mockResponse.status).toHaveBeenCalledWith(201)
    expect(mockResponse.json).toHaveBeenCalledWith(
      { id: 3, name: "Ana Garcia", token: "sñdhgñjfshgskldfsklsdklf47809" }
    )
    expect(mockResponse.send).not.toHaveBeenCalled()
  })
});
