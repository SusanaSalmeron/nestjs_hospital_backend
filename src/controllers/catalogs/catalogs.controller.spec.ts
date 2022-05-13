import { Test, TestingModule } from '@nestjs/testing';
import { DoctorsService } from '../../services/doctors.service'
import { DiseasesService } from '../../services/diseases.service';
import { CatalogController } from './catalogs.controller';
import { Doctor } from '../../classes/doctor';

describe('CatalogController Unit Tests', () => {
  let catalogController: CatalogController;
  let spyDiseasesService: DiseasesService;
  let spyDoctorsService: DoctorsService

  const response = {
    send: jest.fn().mockReturnThis(),
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
  }

  beforeAll(async () => {
    const diseasesServiceProvider = {
      provide: DiseasesService,
      useFactory: () => ({
        findAll: jest.fn(() => ["Chronic Obstructive Pulmonary Disease (COPD)",
          "Conjunctivitis",
          "Crabs",
          "Cryptosporidiosis",
          "Diabetes",
          "AIDS (HIV/AIDS)"]),
      })
    }
    const doctorsServiceProvider = {
      provide: DoctorsService,
      useFactory: () => ({
        findAll: jest.fn(() => [new Doctor(
          1,
          "Karly Sosa",
          "velit.eu.sem@ipsum.co.uk",
          "gynecology",
          "https://images.pexels.com/photos/7580257/pexels-photo-7580257.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        ),
        new Doctor(
          2,
          "Indigo Trevino",
          "nec.eleifend@tempuslorem.net",
          "surgery",
          "https://images.pexels.com/photos/6303556/pexels-photo-6303556.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        )]),
      })
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatalogController],
      providers: [DiseasesService, DoctorsService, diseasesServiceProvider, doctorsServiceProvider],
    }).compile();

    catalogController = module.get<CatalogController>(CatalogController);
    spyDiseasesService = module.get<DiseasesService>(DiseasesService);
    spyDoctorsService = module.get<DoctorsService>(DoctorsService);
  })

  it('catalog controller to be defined', () => {
    expect(catalogController).toBeDefined()
  });

  it('calling getAllDiseases method', async () => {
    await catalogController.getAllDiseases(response)
    expect(spyDiseasesService.findAll).toBeCalled()
    expect(response.status).toBeCalledWith(200)
    expect(response.json).toBeCalledWith(["Chronic Obstructive Pulmonary Disease (COPD)",
      "Conjunctivitis",
      "Crabs",
      "Cryptosporidiosis",
      "Diabetes",
      "AIDS (HIV/AIDS)"])

    expect(response.send).not.toBeCalled()
  })

  it('calling getAllDoctors method', async () => {
    await catalogController.getAllDoctors(response)
    expect(spyDoctorsService.findAll).toBeCalled()
    expect(response.status).toBeCalledWith(200)
    expect(response.json).toBeCalledWith([new Doctor(
      1,
      "Karly Sosa",
      "velit.eu.sem@ipsum.co.uk",
      "gynecology",
      "https://images.pexels.com/photos/7580257/pexels-photo-7580257.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    ),
    new Doctor(
      2,
      "Indigo Trevino",
      "nec.eleifend@tempuslorem.net",
      "surgery",
      "https://images.pexels.com/photos/6303556/pexels-photo-6303556.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    )])
    expect(response.send).not.toBeCalled()
  })

  /* function x() {
    return 0
  } */
});
