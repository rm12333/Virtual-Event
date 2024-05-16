import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    // You can keep ngOnInit for other initialization logic if needed
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const formData = this.forgotPasswordForm.value;

      // Replace 'your-forgot-password-api-endpoint' with the actual URL of your forgot password API
      this.http
        .post('http://localhost:5000/api/user/forgetpassword', formData)
        .subscribe(
          (response) => {
            // Handle successful forgot password response
            console.log('Forgot Password successful:', response);

            // Navigate to the change password page
            this.router.navigate(['/change-password']);
          },
          (error) => {
            // Handle forgot password error
            console.error('Forgot Password error:', error);
          }
        );
    }
  }
}
