import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { FbAuthResponse, User } from "../../../shared/interfaces";
import { catchError, Observable, Subject, tap } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()

export class AuthService {
  constructor(private http: HttpClient) { }
  public error$: Subject<string> = new Subject<string>();
  get token(): any {
    let date:any = localStorage.getItem('fb-token-exp');
    if(!date)
      date = '';
    date = new Date(date);
    if(new Date() > date){
      this.logout();
      return null
    }
    return localStorage.getItem("fb-token")
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true
    return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this)) 
      )
  }

  logout() {
    this.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }


  private handleError(error: HttpErrorResponse):any{
    const {message} = error.error.error

    console.log(message);
    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Email is incorrect!');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Password is incorrect!');
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Your email is not found!');
        break;
    }
    
  }

  private setToken(response: FbAuthResponse | null) {
    if(response){
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token', response.idToken)
      localStorage.setItem('fb-token-exp', expDate.toString())
    }else{
      localStorage.clear()
    }

  }
}