import { ValidateDateMiddleware } from './validate-date.middleware';

describe('ValidateDateMiddleware', () => {
  it('should be defined', () => {
    expect(new ValidateDateMiddleware()).toBeDefined();
  });
});
