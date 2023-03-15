export interface OrderWebhookNotification {
  merchantTradeNo: string;
  productType: string;
  productName: string;
  tradeType: 'WEB' | 'APP' | 'WAP' | 'MINI_PROGRAM' | 'PAYMENT_LINK' | 'OTHERS';
  totalFee: string;
  currency: string;
  openUserId?: string;
  payerInfo?: {
    firstName: string;
    middleName?: string;
    lastName: string;
    walletId: string;
    country?: string;
    city?: string;
    address?: string;
    identityType?: string;
    identityNumber?: string;
    dateOfBirth?: string;
    placeOfBirth?: string;
    nationality?: string;
  };
}
