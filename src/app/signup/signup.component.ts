import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.myForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        c_password: ['', [Validators.required, Validators.minLength(6)]],
        role: ['', Validators.required],
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
    if (this.myForm.valid) {
      // Get form data
      const formData = this.myForm.value;

      // Send data to backend API
      this.http
        .post('http://localhost:5000/api/user/signup', formData)
        .subscribe(
          (response) => {
            // Handle the response from the backend
            console.log('Backend response:', response);
            this.router.navigate(['/login']);
          },
          (error) => {
            // Handle errors
            console.error('Error:', error);
          }
        );
    }
  }

  // Custom validator function
  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const cPassword = control.get('c_password')?.value;

    if (password !== cPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }
}
