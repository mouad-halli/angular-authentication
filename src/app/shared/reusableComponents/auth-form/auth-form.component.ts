import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css'
})
export class AuthFormComponent {
    authForm: FormGroup

    constructor(private formBuilder: FormBuilder) {
        this.authForm = this.formBuilder.group({
            
        })
    }
}
