import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Credentials } from '../model/credentials';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private credentials: Credentials;

  form: FormGroup;

  constructor(
      private authService: AuthService, 
      private formBuilder: FormBuilder,
      private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.min(6)]]
    });
  }

  onSubmit() {
    const login = this.form.get('login').value;
    const password = this.form.get('password').value;

    this.credentials = new Credentials(login, password);

    const result = this.authService.doLogin(this.credentials);
    
    if(result)
      this.router.navigate(['/projects']);
  }
}
