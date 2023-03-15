import { BinancePayMerchantApi } from '..';
import { TEST_BPAY_API_KEY, TEST_BPAY_API_SECRET } from './constant';

describe('testing class and constructor', () => {
  test('empty apiKey and apiSecret should be throw error', () => {
    expect(() => new BinancePayMerchantApi('', '')).toThrowError(
      'apiKey and apiSecret cannot be empty',
    );
  });

  test("constructor should be set 'https://bpay.binanceapi.com' as baseURL", () => {
    const binancePayMerchantApi = new BinancePayMerchantApi(
      TEST_BPAY_API_KEY,
      TEST_BPAY_API_SECRET,
    );
    expect(binancePayMerchantApi['instance'].defaults.baseURL).toBe(
      'https://bpay.binanceapi.com',
    );
  });
});
