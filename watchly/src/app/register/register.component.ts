import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentification.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
/**
 * Component to handle user registration.
 * @param registerForm - FormGroup to handle user input.
 * @param showPassword - Boolean to toggle password visibility.
 * @param errorMessage - Message to display on error.
 * @param authService - AuthenticationService to handle user authentication.
 */
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({}); // Ensuring initialization
  showPassword = false;
  errorMessage: string | null = null;

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('John', [Validators.required, Validators.minLength(3)]),
      surname: new FormControl('Smith', [Validators.required, Validators.minLength(3)]),
      username: new FormControl('johnsmith', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('john.smith@example.com', [Validators.required, Validators.email]),
      password: new FormControl('123456', [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit() {
    this.errorMessage = null;

    if (this.registerForm.invalid) {
      this.errorMessage = 'Please fill all required fields correctly';
      return;
    }

    // Clear any existing user data from localStorage
    localStorage.clear();
    sessionStorage.clear();

    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error registering user:', error);
        if (error.status === 400) {
          this.errorMessage = 'Email already exists';
        } else {
          this.errorMessage = 'An error occurred during registration. Please try again.';
        }
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
