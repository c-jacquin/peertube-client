import { Peertube } from '../peertube';

describe(`Peertube`, () => {
  let peertube: Peertube;

  beforeEach(() => {
    peertube = new Peertube({
      instance: 'foo',
      password: 'bar',
      user: 'jonsnow',
    });
  });

  it(`should be defined`, () => {
    expect(peertube).toBeDefined();
  });
});
