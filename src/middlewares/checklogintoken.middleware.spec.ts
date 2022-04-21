import { ChecklogintokenMiddleware } from './checklogintoken.middleware';

describe('ChecklogintokenMiddleware', () => {
  it('should be defined', () => {
    expect(new ChecklogintokenMiddleware()).toBeDefined();
  });
});
