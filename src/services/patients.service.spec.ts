import { Test, TestingModule } from '@nestjs/testing';
import { PatientsService } from './patients.service';
//TODO test not working properly

describe('PatientsService', () => {
  let patientService: PatientsService;

  let patientMockDbCollection;
  let clinicalRecordsMockDbCollection;

  beforeEach(async () => {
    const fakePatientsTableData = [
      {
        "name": "Lareina Tyler",
        "address": "110-9383 Vehicula Avenue",
        "email": "massa.lobortis@nequenullam.ca",
        "postalZip": "4954",
        "region": "Lung Sun",
        "country": "Brazil",
        "phone": "1-433-883-7645",
        "id": 1,
        "dob": "12-02-1971",
        "ssnumber": "8737559DQ",
        "company": "Mauris Eu Company"
      },
      {
        "name": "Britanney Roth",
        "address": "815-8109 Ut, Street",
        "email": "enim.sit.amet@imperdietnecleo.com",
        "postalZip": "91254",
        "region": "Bolvar",
        "country": "Germany",
        "phone": "1-673-490-1922",
        "id": 2,
        "dob": "07-11-1998",
        "ssnumber": "5616744RO",
        "company": "Eu Odio Corp."
      },
    ]

    const fakeClinicalRecordsTableData = [
      {
        "recordId": 1,
        "date": "01-01-2010",
        "id": 1,
        "description": "malesuada vel, venenatis vel, faucibus id, libero. Donec consectetuer mauris id sapien. Cras dolor dolor, tempus non, lacinia at, iaculis quis, pede. Praesent eu dui. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean eget magna. Suspendisse tristique neque venenatis lacus. Etiam bibendum fermentum metus. Aenean sed pede nec ante blandit viverra. Donec tempus, lorem fringilla ornare placerat, orci lacus vestibulum lorem, sit amet ultricies sem magna nec quam. Curabitur vel lectus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec dignissim magna a tortor. Nunc commodo auctor velit. Aliquam nisl. Nulla eu neque pellentesque massa lobortis ultrices. Vivamus rhoncus. Donec est. Nunc ullamcorper, velit in aliquet lobortis, nisi nibh lacinia orci, consectetuer euismod",
        "diagnostics": "covid-19"
      },
      {
        "recordId": 2,
        "date": "01-01-2010",
        "id": 2,
        "description": "et netus et malesuada fames ac turpis egestas. Fusce aliquet magna a neque. Nullam ut nisi a odio semper cursus. Integer mollis. Integer tincidunt aliquam arcu. Aliquam ultrices iaculis odio. Nam interdum enim non nisi. Aenean eget metus. In nec orci. Donec nibh. Quisque nonummy ipsum non arcu. Vivamus sit amet risus. Donec egestas. Aliquam nec enim. Nunc ut erat. Sed nunc est, mollis non, cursus non, egestas a, dui. Cras pellentesque. Sed dictum. Proin eget odio. Aliquam vulputate ullamcorper magna. Sed eu eros. Nam consequat dolor vitae dolor. Donec fringilla. Donec feugiat metus sit amet ante. Vivamus non lorem vitae odio sagittis semper. Nam tempor diam dictum sapien. Aenean massa. Integer vitae nibh. Donec est mauris, rhoncus id, mollis nec, cursus a, enim. Suspendisse aliquet, sem ut cursus luctus, ipsum leo elementum sem, vitae aliquam eros turpis non enim. Mauris quis turpis vitae purus gravida sagittis. Duis gravida. Praesent eu nulla",
        "diagnostics": "mental breakdown, cold"
      }
    ]

    patientMockDbCollection = {
      find: jest.fn().mockImplementation((keyword = "") => {
        let foundPatients
        if (keyword !== true && keyword) {
          foundPatients = fakePatientsTableData.filter(fp => {
            return (fp.address.includes(keyword.$or[0].address.$regex[0]) || fp.name.includes(keyword.$or[1].name.$regex[0]) || fp.email.includes(keyword.$or[2].email.$regex[0]) || fp.postalZip.includes(keyword.$or[3].postalZip.$contains) || fp.region.includes(keyword.$or[4].region.$regex[0]) || fp.country.includes(keyword.$or[5].country.$regex[0]) || fp.phone.includes(keyword.$or[6].phone.contains))
          })
          return foundPatients
        } else {
          return fakePatientsTableData
        }
      }),
      findOne: jest.fn().mockImplementation((criteria) => {
        const targetId = criteria["id"]
        const otherPatients = fakeClinicalRecordsTableData.filter((op => op.id === targetId))
        return otherPatients ? otherPatients : null

      })
    }

    clinicalRecordsMockDbCollection = {
      find: jest.fn().mockImplementation((criteria) => {
        if (criteria.id) {
          const targetId = criteria["id"]
          const clinicalRecords = fakeClinicalRecordsTableData.filter((fcr) => fcr.id === targetId)
          return clinicalRecords ? clinicalRecords : null
        } else if (criteria.diagnostics) {
          const keyword = criteria["diagnostics"]['$regex'][0]
          const records = fakeClinicalRecordsTableData.filter(r =>
            r.diagnostics.includes(keyword))
          return records ? records : null
        }
      })
    }

    const dbProvider = {
      provide: 'DATABASE_CONNECTION',
      useFactory: async () => {
        return {
          getCollection: jest.fn().mockImplementation((tableName) => {
            if (tableName === "patients") {
              return patientMockDbCollection
            }
            if (tableName === "clinicalRecords") {
              return clinicalRecordsMockDbCollection
            }
          })
        }
      }
    }


    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientsService, dbProvider],

    }).compile();

    patientService = module.get<PatientsService>(PatientsService);
  });

  it('should find a patient by keyword', async () => {
    const result = patientService.findBy("Lareina")

  });
});
