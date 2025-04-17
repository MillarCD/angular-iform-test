import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';

const baseUrl = environment.backendUrl;

interface AuthResponse {
  status: string,
  token?: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  login(email: string, password: string, token: string): Observable<boolean> {
    return this.http.post<AuthResponse>(`${baseUrl}/auth/login`, {
      email,
      password,
      token,
    }).pipe(
      map(res => {
        console.log("response: ", res);
        return res.status === "success";
      })
    );
  }


}
