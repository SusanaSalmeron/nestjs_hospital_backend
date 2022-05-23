import { ValidateDateMiddleware } from './validate-date.middleware';

describe('ValidateDateMiddleware', () => {
  const middleware = new ValidateDateMiddleware
  it('should throw Invalid date when the date is less than actual date', async () => {
    const mockRequest = {
      body: {
        pickedDate: "04/05/2022"
      }
    }
    const mockNext = jest.fn()
    try {
      await middleware.use(mockRequest, null, mockNext)
    } catch (err) {
      expect(err.message).toBe('Invalid Date')
    }
  });
  it('should validate a date when is greater than actual date', async () => {
    const mockRequest = {
      body: {
        pickedDate: "04/10/2030"
      }
    }
    const mockNext = jest.fn()
    await middleware.use(mockRequest, null, mockNext)
    expect(mockNext).toHaveBeenCalled()
  })


});
