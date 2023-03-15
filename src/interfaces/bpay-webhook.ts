export interface BinancePayWebhook {
  bizType: string;
  bizId: number;
  bizStatus: 'PAY_SUCCESS' | 'PAY_CLOSED';
  data: string; // json serialized
}
