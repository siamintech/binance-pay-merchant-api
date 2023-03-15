import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import crypto from 'crypto';

import {
  CreateOrder,
  CreateOrderResponse,
  BinancePayHeaders,
  CertificatesResponse,
  BinancePayWebhook,
  OrderWebhookNotification,
  QueryOrder,
  QueryOrderResponse,
} from './interfaces';

export type {
  CreateOrder,
  CreateOrderResponse,
  QueryOrder,
  QueryOrderResponse,
  BinancePayHeaders,
  BinancePayWebhook,
  OrderWebhookNotification,
};

export class BinancePayMerchantApi {
  private apiKey: string;
  private apiSecret: string;
  private instance: AxiosInstance;
  private certificates?: {
    [key: string]: crypto.KeyObject;
  };

  constructor(
    apiKey: string,
    apiSecret: string,
    axiosConfig: AxiosRequestConfig = {},
  ) {
    if (axiosConfig.baseURL === undefined || axiosConfig.baseURL === null) {
      axiosConfig.baseURL = 'https://bpay.binanceapi.com';
    }

    if (apiKey === '' || apiSecret === '') {
      throw new Error('apiKey and apiSecret cannot be empty');
    }
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.instance = axios.create(axiosConfig);
  }

  /**
   * Create an order on Binance Pay (API Reference: https://binance-pay-docs.github.io/apidocs/merchantapi/en/#create-order)
   *
   * @param order CreateOrder
   *
   * @returns Promise<AxiosResponse<CreateOrderResponse>>
   */
  createOrder(order: CreateOrder): Promise<AxiosResponse<CreateOrderResponse>> {
    const headers = this.sign(order);
    return this.instance.post('/binancepay/openapi/v2/order', order, {
      headers,
    });
  }

  /**
   * Query an order on Binance Pay (API Reference: https://binance-pay-docs.github.io/apidocs/merchantapi/en/#query-order)
   *
   * @param query QueryOrder
   *
   * @returns Promise<AxiosResponse<QueryOrderResponse>>
   */
  queryOrder(query: QueryOrder): Promise<AxiosResponse<QueryOrderResponse>> {
    const headers = this.sign(query);
    return this.instance.post('/binancepay/openapi/v2/order/query', query, {
      headers,
    });
  }

  /**
   * Get the certificates from Binance Pay (API Reference: https://binance-pay-docs.github.io/apidocs/merchantapi/en/#get-certificates)
   *
   * @returns Promise<AxiosResponse<GetCertificatesResponse>>
   */
  getCertificates(): Promise<AxiosResponse<CertificatesResponse>> {
    const headers = this.sign({});
    return this.instance.post(
      '/binancepay/openapi/certificates',
      {},
      { headers },
    );
  }

  /**
   * Sign the request body and return the headers
   *
   * @private
   * @param body
   *
   * @returns BinancePayHeaders
   */
  private sign(body: any): BinancePayHeaders {
    const ts = Date.now().toString();
    const nonce = crypto.randomBytes(Math.ceil(128 / 8)).toString('base64');

    const payload = `${ts}\n${nonce}\n${JSON.stringify(body)}\n`;
    const hmac = crypto.createHmac('sha512', this.apiSecret);
    hmac.update(payload);
    const signature = hmac.digest('hex').toUpperCase();

    return {
      'content-type': 'application/json',
      'binancepay-timestamp': ts,
      'binancepay-nonce': nonce,
      'binancepay-certificate-sn': this.apiKey,
      'binancepay-signature': signature,
    };
  }

  /**
   * Verify the webhook request
   *
   * @param headers BinancePayHeaders
   * @param jsonBody string
   *
   * @returns boolean
   */
  async isValidWebhookRequest(
    headers: BinancePayHeaders,
    jsonBody: string,
  ): Promise<boolean> {
    if (!this.certificates) {
      this.certificates = {};
      const certs = await this.getCertificates();
      if (certs.data.status != 'SUCCESS') {
        throw new Error(
          'Binance Pay Merchant API could not get any certificates',
        );
      }
      for (const cert of certs.data.data) {
        this.certificates[cert.certSerial] = crypto.createPublicKey(
          cert.certPublic,
        );
      }
    }

    const payload = `${headers['binancepay-timestamp']}\n${headers['binancepay-nonce']}\n${jsonBody}\n`;
    const signature = Buffer.from(headers['binancepay-signature'], 'base64');
    const cert = this.certificates[headers['binancepay-certificate-sn']];

    if (!cert) {
      console.error(
        `Cannot find Binance certification with SN: ${headers['binancepay-certificate-sn']}`,
      );
      return false;
    }

    const verifyCert = crypto.createVerify('RSA-SHA256');
    verifyCert.update(payload);
    return verifyCert.verify(cert, signature);
  }
}
