export interface BinancePayHeaders {
  'binancepay-timestamp': string;
  'binancepay-nonce': string;
  'binancepay-certificate-sn': string;
  'binancepay-signature': string;
  'content-type': string;
  [key: string]: string;
}
