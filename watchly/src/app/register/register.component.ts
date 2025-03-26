import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form = {
    name: 'aze',
    surname: 'aze',
    username: 'aze',
    email: 'aze@aze.aze',
    password: 'aze'
  };

  constructor(private authService: AuthenticationService, private router: Router) {}

  onSubmit() {
    console.log('Submitting form', this.form);

    this.authService.register(this.form).subscribe(
      response => {
        console.log('User registered successfully!', response);
        this.router.navigate(['/login']); // Redirect to login page after registration
      },
      error => {
        console.error('Error registering user:', error);
      }
    );
  }

  ngOnInit(): void {}
}
