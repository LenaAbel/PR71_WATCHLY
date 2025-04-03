import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.css']
})
export class ParametersComponent implements OnInit {
  userForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  showPassword: boolean = false;
  @ViewChild('fileInput') fileInput!: ElementRef;
  profileImage: string = 'assets/img/default-person.jpg';
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      profile_picture: ['']
    });
  }

  ngOnInit() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      this.userForm.patchValue({
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
      });
      this.profileImage = user.profile_picture || this.profileImage;
    }
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const maxSize = 5 * 1024 * 1024; 

    if (file) {
      if (file.size > maxSize) {
        this.errorMessage = 'Image is too large. Maximum size is 5MB.';
        return;
      }

      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImage = e.target.result;
        this.errorMessage = ''; // Clear any previous error
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      // Add profile picture to form data if changed
      if (this.profileImage !== 'assets/img/default-person.jpg') {
        this.userForm.patchValue({
          profile_picture: this.profileImage
        });
      }

      this.authService.updateUserProfile(this.userForm.value).subscribe({
        next: (response) => {
          this.successMessage = 'Profile updated successfully';
          localStorage.setItem('userData', JSON.stringify(response.user));
          // Instead of reloading, emit an event or use a service to update header
          this.authService.updateUserData(response.user);
        },
        error: (error) => {
          this.errorMessage = 'Error updating profile';
        }
      });
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
