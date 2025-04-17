import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { FormRequest } from '../interfaces/form-request.interface';

const baseUrl = environment.backendUrl;

interface FormResponse {
  status: string,
  message?: string,
}

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private http = inject(HttpClient);

  createForm(formRequest: FormRequest): Observable<boolean> {
    return this.http.post<FormResponse>(`${baseUrl}/forms`, formRequest).pipe(
          map(res => {
            console.log("Response: ", res);
            return res.status === "success"
          })
        );
  }

  downloadData(): Observable<string[]> {
    return this.http.get<string[]>(`${baseUrl}/forms`).pipe(
      map(res => {
        console.log("Response: ", res);
        return res
      })
    );
  }
}
