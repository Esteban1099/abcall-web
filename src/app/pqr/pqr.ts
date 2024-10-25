export class PQR {
  subject: string;
  description: string;
  consumerId: string;
  companyId: string;

  constructor(subject: string, description: string, consumerId: string, companyId: string) {
    this.subject = subject;
    this.description = description;
    this.consumerId = consumerId;
    this.companyId = companyId;
  }
}
