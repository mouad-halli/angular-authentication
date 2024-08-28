import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';
import { RegisterDto } from '../../core/models/interfaces/register';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

    registrationForm = new FormGroup({
        FirstName: new FormControl(''),
        LastName: new FormControl(''),
        UserName: new FormControl(''),
        Email: new FormControl(''),
        Password: new FormControl('')
    })

    formErrors = {
        FirstName: '',
        LastName: '',
        UserName: '',
        Email: '',
        Password: ''
    }
    
    constructor(private authService: AuthenticationService, private router: Router ) {}

    submitRegistration = () => {
        this.authService.register({
            FirstName: this.registrationForm.value.FirstName ?? '',
            LastName: this.registrationForm.value.LastName ?? '',
            UserName: this.registrationForm.value.UserName ?? '',
            Email: this.registrationForm.value.Email ?? '',
            Password: this.registrationForm.value.Password ?? '',
        })
        .subscribe({
            next: (response) => {
                console.log(response)
                this.router.navigate(['/login'])
            },
            error: (error: any) => {
                const errors = error?.error?.errors
                if (errors) {
                    this.formErrors = {
                        FirstName: errors?.FirstName[0],
                        LastName: errors?.LastName[0],
                        UserName: errors?.UserName[0],
                        Email: errors?.Email[0],
                        Password: errors?.Password[0]
                    }
                    console.log(this.formErrors)
                }
            }
        })
    }
}
