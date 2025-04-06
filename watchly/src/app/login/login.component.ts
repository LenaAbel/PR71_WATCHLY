import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AuthenticationService } from '../services/authentification.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form = new User();
  showPassword = false;
  errorMessage: string | null = null;
  sessionExpiredMessage: string = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onSubmit() {
    this.errorMessage = null;
    
    if (!this.form.email || !this.form.password) {
      this.errorMessage = 'Email and password are required';
      return;
    }

    this.authService.login(this.form).subscribe({
      next: (response) => {
        if (response.token && response.user) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('userData', JSON.stringify(response.user));
          
          window.location.href = '/';
        }
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
    this.route.queryParams.subscribe(params => {
      if (params['message']) {
        this.sessionExpiredMessage = params['message'];
      }
    });
  }

}
