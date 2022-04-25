import { CheckLoginTokenMiddleware } from './checklogintoken.middleware';

describe('ChecklogintokenMiddleware', () => {
  it('should be defined', () => {
    expect(new CheckLoginTokenMiddleware()).toBeDefined();
  });
});
