import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { LoginRequest } from 'src/app/services/auth/loginRequest';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginError : string = ''
    loginForm = this.formBuilder.group({
        email: ['fabian@correo.com', [Validators.required, Validators.email]],
        password: ['', Validators.required],

    })
    constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService) { }
    ngOnInit(): void {

    }
    get email() {
        return this.loginForm.controls.email
    }
    get password() {
        return this.loginForm.controls.password
    }

    login() {
        if (this.loginForm.valid) {
            //llamar al servicio de login y enviamos el formulario como parametro indicando que es de tipo LoginRequest con un AS
            this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
                next: (userData) => {
                    console.log(userData);
                },
                error: (errorData) => {
                    console.error(errorData);
                    this.loginError = errorData
                },
                complete: () => {
                    console.info('complete');
                    this.router.navigate(['/inicio'])
                    this.loginForm.reset()
                }
            })

        } else {
            this.loginForm.markAllAsTouched()
            alert('Formulario invalido')
        }

    }
}