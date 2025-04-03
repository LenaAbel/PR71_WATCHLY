import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AuthenticationService } from '../services/authentification.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form = new User();
  showPassword = false;
  errorMessage: string | null = null;

  constructor(private authService: AuthenticationService, private router: Router) {}

  onSubmit() {
    this.errorMessage = null;
    console.log('Submitting form', this.form);
    
    if (!this.form.email || !this.form.password) {
      this.errorMessage = 'Email and password are required';
      return;
    }

    this.authService.login(this.form).subscribe({
      next: (response) => {
        console.log('User Logging successfully!', response);
        this.router.navigate(['']); // Redirect to login page after registration
      },
      error: (error) => {
        console.error('Error Logging user:', error);
        if (error.status === 400) {
          this.errorMessage = 'Invalid email or password';
        } else {
          this.errorMessage = 'An error occurred during login. Please try again.';
        }
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {
  }

}
