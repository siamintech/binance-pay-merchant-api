import { decimal } from '../types';

// API Reference: https://binance-pay-docs.github.io/apidocs/merchantapi/en/#query-order
export interface QueryOrderResult {
  merchantId: number;
  prepayId: string;
  transactionId?: string;
  merchantTradeNo: string;
  status:
    | 'INITIAL'
    | 'PENDING'
    | 'PAID'
    | 'CANCELED'
    | 'ERROR'
    | 'REFUNDING'
    | 'REFUNDED'
    | 'EXPIRED';
  currency: string;
  orderAmount: decimal;
  openUserId?: string;
  passThroughInfo?: string;
  transactTime?: number;
  createTime: number;
}

// API Reference: https://binance-pay-docs.github.io/apidocs/merchantapi/en/#query-order
export interface QueryOrderResponse {
  status: 'SUCCESS' | 'FAIL';
  code: string;
  data: QueryOrderResult;
  errorMessage: string;
}
