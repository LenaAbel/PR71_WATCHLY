import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user';
import { log } from 'console';
import { last } from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: ''
  }

  constructor() { }

  onSubmit() {
    console.log('Form submitted');

    /*if (JSON.stringify(this.form) === JSON.stringify(new User())) {
      console.log('Form is empty');
      return;
    }
    console.log(this.form);*/
  }

  ngOnInit(): void {
  }

}
