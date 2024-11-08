import { Company } from '../company/company';
import { SimplifiedConsumer } from '../consumer/consumer';

export class Pcc {
  id: string;
  status: string;
  subject: string;
  description: string;
  consumer: SimplifiedConsumer;
  company: Company;
  notifications: Notification[];

  constructor(
    id: string = '',
    status: string = '',
    subject: string = '',
    description: string = '',
    Consumer: SimplifiedConsumer,
    company: Company,
    notifications: Notification[] = []
  ) {
    this.id = id;
    this.status = status;
    this.subject = subject;
    this.description = description;
    this.consumer = Consumer;
    this.company = company;
    this.notifications = notifications;
  }
}

export class Notification {
  id: string;
  reason: string;
  status: string;
  created_at: string;

  constructor(id: string = '', reason: string = '', created_at: string = '', status: string = '') {
    this.id = id;
    this.reason = reason;
    this.created_at = created_at;
    this.status = status;
  }
}
