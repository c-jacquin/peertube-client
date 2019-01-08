import { OAuth } from '../oauth';

describe(`Peertube`, () => {
  let oauth: OAuth;

  beforeEach(() => {
    oauth = new OAuth({
      baseUrl: 'foo',
      password: 'bar',
      user: 'jonsnow',
    });
  });

  it(`should be defined`, () => {
    expect(oauth).toBeDefined();
  });
});
