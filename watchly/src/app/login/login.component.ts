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


  constructor(private authService: AuthenticationService, private router: Router) {}

  onSubmit() {
    console.log('Submitting form', this.form);
    this.authService.login(this.form).subscribe(
      response => {
        console.log('User Logging successfully!', response);
        this.router.navigate(['']); // Redirect to login page after registration
      },
      error => {
        console.error('Error Logging user:', error);
      }
    );
  }

  ngOnInit(): void {
  }

}
