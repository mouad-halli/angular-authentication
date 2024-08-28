import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

    user$

    constructor(private authenticationService: AuthenticationService, private router: Router) {
        this.user$ = this.authenticationService.user$
        console.log(this.user$)
    }

    logout = () => {
        this.authenticationService.logout().subscribe({
            next: () => {
                console.log("logged out successfully")
                this.router.navigate(['login'])
            },
            error: (error) => {
                console.error('Error during logout:', error);
            }
        })
    }

}
