import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  // Get all opportunities
  getOpportunities(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/opportunities`);
  }

  // Create opportunity (NGO)
  createOpportunity(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/opportunities`, data);
  }

  // Get all applications (Admin)
  getApplications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/applications`);
  }

  // Volunteer applies
  applyForOpportunity(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/applications`, data);
  }

  // ✅ Update application status
  updateApplicationStatus(id: string, status: string): Observable<any> {
    console.log(`PUT → ${this.baseUrl}/applications/${id} | status: ${status}`);
    return this.http.put(`${this.baseUrl}/applications/${id}`, { status });
  }
}
