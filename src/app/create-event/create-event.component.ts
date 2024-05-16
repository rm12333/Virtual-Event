import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
})
export class CreateEventComponent {
  eventForm: FormGroup;
  selectedFile: File | undefined;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.eventForm = this.formBuilder.group({
      title: ['', Validators.required],
      dateAndTime: ['', [Validators.required, this.futureDateValidator]],
      duration: ['', Validators.required],
      coverImage: [null, [Validators.required, this.imageFileValidator]],
      registrationFee: ['', Validators.required],
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    // this.eventForm.patchValue({
    //   coverImage: this.selectedFile,
    // });
  }

  onSubmit() {
    if (this.eventForm.valid) {
      const formData = new FormData();
      formData.append('title', this.eventForm.value.title);
      formData.append('dateAndTime', this.eventForm.value.dateAndTime);
      formData.append('duration', this.eventForm.value.duration);
      formData.append('registrationFee', this.eventForm.value.registrationFee);

      if (this.selectedFile) {
        formData.append(
          'coverImage',
          this.selectedFile,
          this.selectedFile.name
        );
      }

      this.http
        .post<any>('http://localhost:5000/api/event/create-event', formData)
        .subscribe(
          (response) => {
            console.log('API Response:', response);
            // Handle success (e.g., show success message, redirect)
          },
          (error) => {
            console.error('API Error:', error);
            // Handle error (e.g., show error message)
          }
        );
    }
  }

  private futureDateValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      return { futureDate: true };
    }

    return null;
  }

  private imageFileValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

    if (control.value) {
      const fileExtension = (control.value as string)
        .split('.')
        .pop()
        ?.toLowerCase();

      if (fileExtension && allowedExtensions.indexOf(fileExtension) === -1) {
        return { invalidImageType: true };
      }
    }

    return null;
  }
}
