import { SimplifiedConsumer } from '../consumer/consumer';

export class Pcc {
  id: string;
  status: string;
  subject: string;
  description: string;
  consumer: SimplifiedConsumer;

  constructor(
    id: string = '',
    status: string = '',
    subject: string = '',
    description: string = '',
    Consumer: SimplifiedConsumer
  ) {
    this.id = id;
    this.status = status;
    this.subject = subject;
    this.description = description;
    this.consumer = Consumer;
  }
}
