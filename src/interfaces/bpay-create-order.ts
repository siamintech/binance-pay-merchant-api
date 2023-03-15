import { decimal } from '../types';

export interface CreateOrder {
  merchant?: {
    subMerchantId: string; // The sub-merchant ID
  };
  env: {
    terminalType: 'APP' | 'WEB' | 'WAP' | 'MINI_PROGRAM' | 'OTHERS'; // https://binance-pay-docs.github.io/apidocs/merchantapi/en/#terminal-type
    osType?: string;
    orderClientIp?: string;
    cookieId?: string;
  };
  merchantTradeNo: string;
  orderAmount: decimal; // 0.01 ~ 1000000.00
  currency: 'BUSD' | 'USDT' | 'MBOX';
  goods: {
    goodsType: '01' | '02'; // 01: physical goods, 02: digital
    goodsCategory:
      | '0000'
      | '1000'
      | '2000'
      | '3000'
      | '4000'
      | '5000'
      | '6000'
      | '7000'
      | '8000'
      | '9000'
      | 'A000'
      | 'B000'
      | 'C000'
      | 'D000'
      | 'E000'
      | 'F000'
      | 'Z000'; // https://binance-pay-docs.github.io/apidocs/merchantapi/en/#goods-category
    referenceGoodsId: string; // The ID of the goods in the merchant system
    goodsName: string; // Goods name special character is prohibited Example: \ " or emoji
    goodsDetail?: string;
    goodsUnitAmount?: {
      currency: string;
      amount: decimal;
    };
    goodsQuantity?: string;
  };
  shipping?: {
    shippingName?: {
      firstName: string;
      middleName?: string;
      lastName: string;
    }; // The recipient name
    shippingAddress?: {
      region: string;
      state?: string;
      city?: string;
      address?: string;
      zipCode?: string;
      shippingAddressType?: '01' | '02' | '03' | '04';
    };
    shippingPhoneNo?: string;
  };
  buyer?: {
    referenceBuyerId: string;
    buyerName: {
      firstName: string;
      middleName?: string;
      lastName: string;
    };
    buyerPhoneCountryCode?: string;
    buyerPhoneNo?: string;
    buyerEmail?: string;
    buyerRegistrationTime?: number;
    buyerBrowserLanguage?: string;
  };
  returnUrl?: string; // The URL to which the buyer is redirected after the payment is completed
  cancelUrl?: string; // The URL to which the buyer is redirected after the payment is canceled
  orderExpireTime?: number; // The time when the order expires, in milliseconds
  supportPayCurrency?: string; // The currency supported by the payment method, separated by commas e.g. "BUSD,BNB"
  appId?: string; // The ID of the app that is used to pay This field is required when terminalType is MINI_PROGRAM.
}
