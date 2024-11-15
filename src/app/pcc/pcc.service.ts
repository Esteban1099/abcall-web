import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pcc } from './pcc';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PccService {
  constructor(private httpClient: HttpClient) {}

  createPcc(companyId: string, consumerId: string, pcc: Pcc): Observable<Pcc> {
    return this.httpClient.post<Pcc>(
      `/api/companies/${companyId}/consumers/${consumerId}/pccs`,
      pcc
    );
  }

  getPccList(role: string): Observable<Pcc[]> {
    if (role === 'AGENT') {
      return this.httpClient.get<Pcc[]>('/api/agents/pccs');
    } else {
      return this.httpClient.get<Pcc[]>('/api/clients/pccs');
    }
  }

  getPccDetail(id: string): Observable<Pcc> {
    return this.httpClient.get<Pcc>(`/api/pccs/${id}`);
  }
}
