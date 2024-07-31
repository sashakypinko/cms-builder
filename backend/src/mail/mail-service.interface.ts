export const MAIL_SERVICE = 'MAIL_SERVICE';

export interface SendParams {
  to: string;
  subject: string;
  html: string;
}

export interface IMailService {
  send: (params: SendParams) => void;
}
