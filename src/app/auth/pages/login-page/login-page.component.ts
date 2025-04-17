import { AuthService } from './../../services/auth.service';
import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './login-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  submitted = signal<boolean>(false);
  showSuccessMessage = signal<boolean>(false);

  private authService = inject(AuthService);

    loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    })

  onSubmit(): void {
    this.submitted.set(true)

    if (this.loginForm.invalid) {
      return
    }

    const { email = '', password = '' } = this.loginForm.value;

    if (!(window as any).grecaptcha) {
      console.error('reCAPTCHA no está cargado.');
      return;
    }

    (window as any).grecaptcha.ready(async () => {
      const token = await (window as any).grecaptcha.execute('6Lcm2BorAAAAADej42ZZ9wcnmi8Bmeht3E0YoUyY', {action: 'submit'})

      console.log("Login submitted:", this.loginForm.value)
      this.authService.login(email!, password!, token).subscribe( (isAuthenticated) => {
        if (!isAuthenticated) {
          console.log("Fail to authenticate")
          return;
        }

        this.showSuccessMessage.set(true)
        setTimeout(() => {
          this.showSuccessMessage.set(false)
          this.router.navigate(["/admin"])
        }, 2000)
      })
    })

  }
}
