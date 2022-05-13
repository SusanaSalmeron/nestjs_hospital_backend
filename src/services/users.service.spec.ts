import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../classes/user';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let usersService: UsersService;

  let usersMockDBCollection

  beforeEach(async () => {
    const fakeUsersTableData = [
      {
        "name": "Lee Hunter",
        "password": "Password6",
        "email": "curabitur.ut@orciluctus.net",
        "role": "patient",
        "id": 1
      },
      {
        "name": "Ulysses Gray",
        "email": "vestibulum.mauris@pedenonummy.com",
        "password": "Password2",
        "role": "sanitario",
        "id": 2
      }
    ]

    usersMockDBCollection = {
      findOne: jest.fn().mockImplementation((criteria) => {
        const targetEmail = criteria['email']
        const user = fakeUsersTableData.filter((fu) => fu.email === targetEmail)
        return user.length ? user[0] : null
      }),
      insert: jest.fn()
    }

    const dbProvider = {
      provide: 'DATABASE_CONNECTION',
      useFactory: () => {
        return {
          getCollection: jest.fn().mockReturnValue(usersMockDBCollection)
        }
      }
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, dbProvider],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('should not return user when user does not exists', async () => {
    const result = await usersService.findUserByEmail("ggg@gmail.com")
    expect(usersMockDBCollection.findOne).toHaveBeenCalledWith({ email: "ggg@gmail.com" })
    expect(result).toEqual(null)
  });
  it('should return a user when user exists', async () => {
    const result = await usersService.findUserByEmail("curabitur.ut@orciluctus.net")
    expect(usersMockDBCollection.findOne).toHaveBeenCalledWith({ email: "curabitur.ut@orciluctus.net" })
    expect(result).toEqual(
      new User(
        'Lee Hunter',
        'curabitur.ut@orciluctus.net',
        'Password6',
        'patient',
        1
      ))
  })
  it('should return null when user exists', async () => {
    const result = await usersService.signup("vestibulum.mauris@pedenonummy.com", "Password2", "Ulysses Gray")
    expect(usersMockDBCollection.findOne).toHaveBeenCalledWith({
      email: "vestibulum.mauris@pedenonummy.com"
    })
    expect(result).toEqual(null)
  })
  it('should create a new user when user does not exists', async () => {
    const result = await usersService.signup("emily@gmail.com", "Password1", "Emily Smith")
    expect(usersMockDBCollection.findOne).toHaveBeenCalledWith({
      email: "emily@gmail.com"
    })
    expect(result).toEqual(10040)
  })
});
