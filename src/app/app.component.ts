import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './core/services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(private authenticationService: AuthenticationService) {}

    ngOnInit() {
        // initialize user from localstorage
        this.authenticationService.initUser()

        // ping server for user data
        this.authenticationService.checkLoginAndInitUser().subscribe({
            next: (user) => console.log(`user logged in ${user.email}`),
            error: (error) => console.error(error.message)
        })
    }
}
