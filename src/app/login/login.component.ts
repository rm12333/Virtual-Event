import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    // You can keep ngOnInit for other initialization logic if needed
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;

      // Replace 'your-login-api-endpoint' with the actual URL of your login API
      this.http
        .post('http://localhost:5000/api/user/login', formData)
        .subscribe(
          (response) => {
            // Handle successful login response
            console.log('Login successful:', response);

            // Optionally, you can navigate to another page here
            // this.router.navigate(['/dashboard']);
          },
          (error) => {
            // Handle login error
            console.error('Login error:', error);
          }
        );
    }
  }
}
