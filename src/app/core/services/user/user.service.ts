import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private apiUrl = `${environment.API_URL}/api/user`

    constructor(private HttpClient: HttpClient) { }

    me = () => {
        this.HttpClient.get(`${this.apiUrl}/me`)
        .subscribe({
            next: (response) => {
                console.log(response)
            },
            error: (error) => console.log(error)
        })
    }
}
