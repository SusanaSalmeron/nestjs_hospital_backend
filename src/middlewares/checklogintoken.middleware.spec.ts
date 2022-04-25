import { CheckLoginTokenMiddleware } from './checkLoginToken.middleware'

describe('ChecklogintokenMiddleware', () => {
  it('should be defined', () => {
    expect(new CheckLoginTokenMiddleware()).toBeDefined();
  });
});
