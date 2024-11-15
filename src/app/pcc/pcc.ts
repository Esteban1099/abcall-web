import { Company } from '../company/company';
import { Consumer } from '../consumer/consumer';

export class Pcc {
  id: string;
  status: string;
  subject: string;
  description: string;
  consumer: Consumer;
  company: Company;
  create_at: Date;
  notifications: Notification[];

  constructor(
    id: string = '',
    status: string = '',
    subject: string = '',
    company: Company,
    consumer: Consumer,
    create_at: Date,
    notifications: Notification[] = [],
    description: string = ''
  ) {
    this.id = id;
    this.status = status;
    this.subject = subject;
    this.description = description;
    this.company = company;
    this.create_at = create_at;
    this.notifications = notifications;
    this.consumer = consumer;
  }
}

export class Notification {
  id: string;
  reason: string;
  status: string;
  created_at: string;

  constructor(
    id: string = '',
    reason: string = '',
    created_at: string = '',
    status: string = ''
  ) {
    this.id = id;
    this.reason = reason;
    this.created_at = created_at;
    this.status = status;
  }
}
