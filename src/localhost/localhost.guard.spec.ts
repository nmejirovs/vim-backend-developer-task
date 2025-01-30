import { LocalhostGuard } from './localhost.guard';

describe('LocalhostGuard', () => {
  it('should be defined', () => {
    expect(new LocalhostGuard()).toBeDefined();
  });
});
