import { ConfigService } from '@nestjs/config';
import { AuthenticateTokenMiddleware } from './authenticateToken.middleware';
import { createMock } from '@golevelup/ts-jest';
import * as jwt from 'jsonwebtoken'


describe('AuthenticateMiddleware', () => {
  const mockConfigService = createMock<ConfigService>({
    get: jest.fn().mockReturnValue("zapato")
  })
  const middleware: AuthenticateTokenMiddleware = new AuthenticateTokenMiddleware(mockConfigService)


  it('should fail if there is no authorization header', async () => {
    const mockRequest = createMock<Request>({
      headers: {}
    })
    try {
      await middleware.use(mockRequest, null, () => { true })
      fail('the request should have fail because there is no authorization header')
    } catch (err) {
      expect(err.message).toBe('No token found')
    }
  });

  it('should verify token', async () => {
    const mockRequest = {
      headers
        : { authorization: "bearer 123" },
      role: "sanitario"
    }
    const verify = jest.spyOn(jwt, 'verify');
    verify.mockImplementation(() => ({ role: 'sanitario' }));

    const mockNext = jest.fn()
    await middleware.use(mockRequest, null, mockNext)
    expect(mockNext).toHaveBeenCalled()
  })
});
