import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'microsoft-login-button',
  templateUrl: './microsoft-login-button.component.html',
  styleUrl: './microsoft-login-button.component.css'
})
export class MicrosoftLoginButtonComponent {

    constructor(
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer
    ) {
        this.matIconRegistry.addSvgIcon(
            'microsoft-icon-svg',
            this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/microsoft-logo.svg')
        )
    }

    redirectToMicrosoftLogin = () => {
        window.location.href = `${environment.API_URL}api/authentication/microsoft-login`
    }
}
