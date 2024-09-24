import { expect, use } from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import HTTPTransport from './HTTPTransport';

describe('HTTP Transport', () => {
  use(sinonChai);
  const sandbox = sinon.createSandbox();
  let http: HTTPTransport;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let request: any;

  beforeEach(() => {
    http = new HTTPTransport();
    request = sandbox
      .stub(http, 'request' as keyof typeof http)
      .callsFake(() => Promise.resolve('OK'));
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should stringify query object for GET request where all parameters are strings', () => {
    http.get('', { data: { a: '1', b: '2' } });

    expect(request).calledWithMatch('?a=1&b=2', {
      data: { a: '1', b: '2' },
      method: 'GET',
    });
  });

  it(`should stringify query object for GET request 
    where all parameters are strings and numbers`, () => {
    http.get('', { data: { a: '1', b: 2 } });

    expect(request).calledWithMatch('?a=1&b=2', {
      data: { a: '1', b: 2 },
      method: 'GET',
    });
  });

  it(`should stringify query object for GET request 
    where where are the encoded characters`, () => {
    http.get('', { data: { a: '1/5', b: '2#0' } });

    expect(request).calledWithMatch('?a=1%2F5&b=2%230', {
      data: { a: '1/5', b: '2#0' },
      method: 'GET',
    });
  });

  it('must be able to call the GET method', () => {
    expect(http.get).to.be.a('function');
  });

  it('must be able to call the PUT method', () => {
    expect(http.put).to.be.a('function');
  });

  it('must be able to call the POST method', () => {
    expect(http.post).to.be.a('function');
  });

  it('must be able to call the DELETE method', () => {
    expect(http.delete).to.be.a('function');
  });
});
