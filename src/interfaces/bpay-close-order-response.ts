// API Reference: https://binance-pay-docs.github.io/apidocs/merchantapi/en/#close-order
export interface CloseOrderResponse {
  status: 'SUCCESS' | 'FAIL';
  code: string;
  data?: boolean;
  errorMessage?: string;
}
