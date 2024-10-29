export class Pcc {
  id: string;
  subject: string;
  description: string;

  constructor(
    id: string = "",
    subject: string = "",
    description: string = "",
  ) {
    this.id = id;
    this.subject = subject;
    this.description = description;
  }
}
