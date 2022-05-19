import { AuthorizeDoctorMiddleware } from './authorize-doctor.middleware';
import { createMock } from '@golevelup/ts-jest'

describe('AuthorizeDoctorMiddleware', () => {
  const middleware: AuthorizeDoctorMiddleware = new AuthorizeDoctorMiddleware
  it('should not authorized a doctor ', async () => {
    const mockRequest = createMock<Request>({
    })

    try {
      await middleware.use(mockRequest, null, () => { true })
      fail("Failed because there is no role")
    } catch (err) {
      expect(err.message).toBe('Unauthorized User')
    }
  });
  it('should authorized a doctor ', async () => {
    const mockRequest = {
      role: "sanitario"
    }
    const mockNext = jest.fn()
    await middleware.use(mockRequest, null, mockNext)
    expect(mockNext).toHaveBeenCalled()
  });
});
