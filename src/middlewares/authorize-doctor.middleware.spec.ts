import { AuthorizeDoctorMiddleware } from './authorize-doctor.middleware';

describe('AuthorizeDoctorMiddleware', () => {
  it('should be defined', () => {
    expect(new AuthorizeDoctorMiddleware()).toBeDefined();
  });
});
