import { expect, use } from 'chai';
import sinonChai from 'sinon-chai';
import { createSandbox, SinonStub } from 'sinon';
import HTTPTransport from '../utils/HTTPTransport';

describe('HTTP Transport', () => {
  use(sinonChai);
  const sandbox = createSandbox();
  let http: HTTPTransport;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let request: SinonStub<any>;

  beforeEach(() => {
    http = new HTTPTransport();
    request = sandbox.stub(http, 'request' as keyof typeof http);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should stringify query object for GET request where all parameters are strings', () => {
    http.get('', { data: { a: '1', b: '2' } });

    expect(request).calledWithMatch('?a=1&b=2', 'GET');
  });
});
