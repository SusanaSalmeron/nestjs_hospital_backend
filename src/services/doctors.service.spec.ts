import { Test, TestingModule } from '@nestjs/testing';
import { DoctorsService } from './doctors.service';

describe('DoctorsService', () => {
  let doctorsService: DoctorsService;

  let doctorsMockDbCollection

  beforeEach(async () => {
    const fakeDoctorsTableData = [{
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

    doctorsMockDbCollection = {
      find: jest.fn().mockImplementation(() => {
        return fakeDoctorsTableData
      })
    }

    const dbProvider = {
      provide: 'DATABASE_CONNECTION',
      useFactory: async () => {
        return {
          getCollection: jest.fn().mockReturnValue(doctorsMockDbCollection)
        }
      }
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorsService, dbProvider],
    }).compile();

    doctorsService = module.get<DoctorsService>(DoctorsService);
  }),

    it('should be defined', async () => {
      const result = await doctorsService.findAll()
      expect(doctorsMockDbCollection.find).toHaveBeenCalledWith(true)
      expect(result).toEqual([{
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
      ])
    });
});