export class Consumer {
  id: string;
  identification_type: string;
  identification_number: string;
  name: string;
  email: string;
  contact_number: string;
  address: string;
  companies: Company[];
  pccs: PCCS[];

  public constructor(
    id: string,
    identification_type: string,
    identification_number: string,
    name: string,
    email: string,
    contact_number: string,
    address: string,
    companies: Company[],
    pccs: PCCS[]
  ) {
    this.id = id;
    this.identification_type = identification_type;
    this.identification_number = identification_number;
    this.name = name;
    this.email = email;
    this.contact_number = contact_number;
    this.address = address;
    this.companies = companies;
    this.pccs = pccs;
  }
}

export class Company {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

export class PCCS {
  id: string;
  subject: string;

  constructor(id: string, subject: string) {
    this.id = id;
    this.subject = subject;
  }
}
