import { BinancePayMerchantApi } from '..';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import MockAdapter from 'axios-mock-adapter';

jest.mock('axios');

describe('testing order', () => {
  test('create order should be pass', () => {
    const mock = new MockAdapter(axios);
    const data = { response: true };
  });
});
