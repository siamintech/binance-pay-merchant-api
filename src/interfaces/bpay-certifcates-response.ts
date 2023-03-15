export interface CertificateResult {
  certPublic: string;
  certSerial: string;
}

export interface CertificatesResponse {
  status: 'SUCCESS' | 'FAIL';
  code: string;
  data: Array<CertificateResult>;
}
