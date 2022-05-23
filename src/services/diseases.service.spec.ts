import { Test, TestingModule } from '@nestjs/testing';
import { DiseasesService } from './diseases.service';

describe('DiseasesService', () => {
  let diseasesService: DiseasesService;

  let diseasesMockDbCollection

  beforeEach(async () => {
    const fakeDiseasesTableData = [
      { name: "Acute Flaccid Myelitis (AFM)" },
      { name: "Alphaviruses" },
      { name: "Alzheimer's Diseases" },
      { name: "Arthritis" },
      { name: "Babesiosis" },
      { name: "Blue-green Algae" }
    ]

    diseasesMockDbCollection = {
      find: jest.fn().mockImplementation(() => {
        return fakeDiseasesTableData
      })
    }

    const dbProvider = {
      provide: 'DATABASE_CONNECTION',
      useFactory: async () => {
        return {
          getCollection: jest.fn().mockReturnValue(diseasesMockDbCollection)
        }
      }
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [DiseasesService, dbProvider],
    }).compile();

    diseasesService = module.get<DiseasesService>(DiseasesService);
  });

  it('should return a diseases array', async () => {
    const result = await diseasesService.findAll()
    expect(diseasesMockDbCollection.find).toHaveBeenCalledWith(true)
    expect(result).toEqual(
      [
        "Acute Flaccid Myelitis (AFM)",
        "Alphaviruses",
        "Alzheimer's Diseases",
        "Arthritis",
        "Babesiosis",
        "Blue-green Algae"
      ]
    )
  });
});
