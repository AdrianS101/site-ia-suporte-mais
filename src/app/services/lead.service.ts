import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface LeadData {
  contato: {
    name: string;
    email: string;
    phone: string;
    company: string;
  };
  modulos: string[];
  orcamento: {
    dispatchVolume: number;
    integrations: string;
    monthlyVolume: number;
    users: number;
  };
  empresa_id: number;
  canal_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class LeadService {
  private apiUrl = `${environment.apiUrl}/webhook/lead`;

  constructor(private http: HttpClient) {}

  sendLead(leadData: LeadData): Observable<any> {
    return this.http.post(this.apiUrl, leadData);
  }
}
