import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';

import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormService } from '../../../form/services/form.service';
import { FormRequest } from '../../../form/interfaces/form-request.interface';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-form-page',
  imports: [
    NgClass, ReactiveFormsModule
  ],
  templateUrl: './form-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormPageComponent {

  private fb = inject(FormBuilder);
  submitted = signal<boolean>(false);
  showSuccessMessage = signal<boolean>(false);
  isLoading = signal<boolean>(false);

  private formService = inject(FormService);


  formGroup = this.fb.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    age: [0, [Validators.required, Validators.min(0)]],
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

    const { email = '',
      firstName = '',
      lastName = '',
      age = 20,
      submitToday = false } =this.formGroup.value;

    (window as any).grecaptcha.ready(async () => {
      this.isLoading.set(true);
      const token = await (window as any).grecaptcha.execute('6Lcm2BorAAAAADej42ZZ9wcnmi8Bmeht3E0YoUyY', {action: 'submit'})

      // console.log('Token reCAPTCHA:', token);

      const res = await this.sendForm({
        email: email!,
        firstName: firstName!,
        lastName: lastName!,
        age: age!,
        submitToday: submitToday!,
        token
      });

      this.isLoading.set(false);
      if (!res) return;

      // Show success message (you could use a toast service here)
      this.showSuccessMessage.set(true)
      setTimeout(() => (this.showSuccessMessage.set(false)), 3000)
    });


  }

  private async sendForm(formRequest: FormRequest): Promise<boolean> {
    const res = await firstValueFrom(this.formService.createForm(formRequest))
      .catch(() => false);
    console.log('response: ', res);

    return res;
  }
}
