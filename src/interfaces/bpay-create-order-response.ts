export interface CreateOrderResult {
  prepayId: string;
  terminalType: string;
  expireTime: number;
  qrcodeLink: string;
  qrContent: string;
  checkoutUrl: string;
  deeplink: string;
  universalUrl: string;
}

export interface CreateOrderResponse {
  status: 'SUCCESS' | 'FAIL';
  code: string;
  data?: CreateOrderResult;
  errorMessage?: string;
}
