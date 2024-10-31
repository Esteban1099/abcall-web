import { Company } from '../company/company';
import { Pcc } from '../pcc/pcc';

export interface SimplifiedConsumer {
  id: string;
  identification_type: string;
  identification_number: string;
}

export class Consumer {
  id: string;
  identification_type: string;
  identification_number: string;
  name: string;
  email: string;
  contact_number: string;
  address: string;
  companies: Company[];
  pccs: Pcc[];

  public constructor(
    id: string = '',
    identification_type: string = '',
    identification_number: string = '',
    name: string = '',
    email: string = '',
    contact_number: string = '',
    address: string = '',
    companies: Company[] = [],
    pccs: Pcc[] = []
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
