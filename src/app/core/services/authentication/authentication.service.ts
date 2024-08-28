import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { RegisterDto } from '../../models/interfaces/register';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from '../../models/interfaces/user';
import { LoginDto } from '../../models/interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    authApiUrl = `${environment.API_URL}api/authentication`
    userApiUrl = `${environment.API_URL}api/user`
    private userSubject = new BehaviorSubject<User | null>(null)
    public user$ = this.userSubject.asObservable()

    constructor(private httpClient: HttpClient) { }

    register = (registerData: RegisterDto) => {
        return this.httpClient.post(`${this.authApiUrl}/register`, registerData)
    }

    login = (loginData: LoginDto) => {
        return this.httpClient.post<User>(`${this.authApiUrl}/login`, loginData).pipe(
            tap(userData => {
                this.userSubject.next(userData)
                localStorage.setItem('user', JSON.stringify(userData))
            }),
            catchError(error => {
                return throwError(() => new Error("error occured during login: " + error.message))
            })
        )
    }

    logout = () => {
        return this.httpClient.get(`${this.authApiUrl}/logout`, { withCredentials: true }).pipe(
            tap((response) => {
                localStorage.removeItem('user')
                this.userSubject.next(null)
            }),
            catchError(error => {
                return throwError(() => new Error("An error occurred while logging out: " + error.message))
              })
        )
    }

    initUser = () => {
        const localStorageUser = localStorage.getItem('user')

        if (localStorageUser)
            this.userSubject.next(JSON.parse(localStorageUser))
    }

    checkLoginAndInitUser = () => {
        return this.httpClient.get<User>(`${this.userApiUrl}/me`, { withCredentials: true }).pipe(
            tap(userData => {
                this.userSubject.next(userData)
                localStorage.setItem('user', JSON.stringify(userData))
            }),
            catchError(error => {
                let errMsg = 'something else'
                
                if (error.status === 401)
                    errMsg = "user is not authorized, must login"

                return throwError(() => new Error(errMsg))
            })
        )
    }

}
