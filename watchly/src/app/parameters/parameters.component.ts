import { Component, OnInit } from '@angular/core';
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
      password: ['']
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
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.authService.updateUserProfile(this.userForm.value).subscribe({
        next: (response) => {
          this.successMessage = 'Profile updated successfully';
          localStorage.setItem('userData', JSON.stringify(response.user));
          // Refresh page to update header
          window.location.reload();
        },
        error: (error) => {
          this.errorMessage = 'Error updating profile';
        }
      });
    }
  }
}
