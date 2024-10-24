export class Consumer {
  id: string;
  name: string;
  email: string;
  tipoId: string;

  constructor(id: string, name: string, email: string, tipoId: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.tipoId = tipoId;
  }
}
