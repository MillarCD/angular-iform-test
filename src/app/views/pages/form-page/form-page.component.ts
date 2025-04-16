import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';

import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-form-page',
  imports: [
    NgClass, ReactiveFormsModule, RouterLink
  ],
  templateUrl: './form-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormPageComponent {

  private fb = inject(FormBuilder);
  submitted = signal<boolean>(false);
  showSuccessMessage = signal<boolean>(false);


  formGroup = this.fb.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    age: ["", [Validators.required, Validators.min(0)]],
    submitToday: [true],
  })

  onSubmit(): void {
    this.submitted.set(true);

    if (this.formGroup.invalid) {
      return
    }

    if (!(window as any).grecaptcha) {
      console.error('reCAPTCHA no está cargado.');
      return;
    }

    (window as any).grecaptcha.ready(async () => {
      const token = await (window as any).grecaptcha.execute('6Lcm2BorAAAAADej42ZZ9wcnmi8Bmeht3E0YoUyY', {action: 'submit'})

      console.log('Token reCAPTCHA:', token);

      this.sendForm();

      // Show success message (you could use a toast service here)
      this.showSuccessMessage.set(true)
      setTimeout(() => (this.showSuccessMessage.set(false)), 3000)
    });


  }

  private sendForm(): void {
    console.log("Form submitted:", this.formGroup.value)
  }
}
