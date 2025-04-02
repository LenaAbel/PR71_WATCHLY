import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentification.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({}); // Ensuring initialization

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('azeaze', [Validators.required, Validators.minLength(3)]),
      surname: new FormControl('azeaze', [Validators.required, Validators.minLength(3)]),
      username: new FormControl('azeaze', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('aze@aze.aze', [Validators.required, Validators.email]),
      password: new FormControl('azeaze', [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    console.log('Submitting form', this.registerForm.value);

    this.authService.register(this.registerForm.value).subscribe(
      response => {
        console.log('User registered successfully!', response);
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Error registering user:', error);
      }
    );
  }
}
