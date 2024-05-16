import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.changePasswordForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        new_password: ['', [Validators.required, Validators.minLength(6)]],
        c_password: ['', [Validators.required, Validators.minLength(6)]],
        otp: ['', Validators.required],
      },
      {
        validator: this.passwordMatchValidator, // Add custom validator function
      }
    );
  }

  ngOnInit() {
    // You can keep ngOnInit for other initialization logic if needed
  }

  onSubmit() {
    if (this.changePasswordForm.valid) {
      const formData = this.changePasswordForm.value;

      // Replace 'your-change-password-api-endpoint' with the actual URL of your change password API
      this.http
        .post('http://localhost:5000/api/user/changepassword', formData)
        .subscribe(
          (response) => {
            // Handle successful change password response
            console.log('Change Password successful:', response);

            // Optionally, you can navigate to another page here
            // this.router.navigate(['/login']);
          },
          (error) => {
            // Handle change password error
            console.error('Change Password error:', error);
          }
        );
    }
  }

  // Custom validator function
  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const newPassword = control.get('new_password')?.value;
    const cPassword = control.get('c_password')?.value;

    if (newPassword !== cPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }
}
