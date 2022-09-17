import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from '../../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  adminLoginForm:FormGroup | any
  submitted = false
  message = ''

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    
    this.route.queryParams.subscribe((params:Params) => {
      if(params['loginAgain']){
        this.message = 'Please log in'
      }
    })

    this.adminLoginForm = new FormGroup({
      email: new FormControl(null,
        [
          Validators.required,
          Validators.email
        ]),
      password: new FormControl(null,
        [
          Validators.required,
          Validators.minLength(6)
        ])
    });
    this.auth.logout()
  }
  submit(){
    this.submitted = true
    const user: User ={
      email: this.adminLoginForm.value.email,
      password: this.adminLoginForm.value.password,
      returnSecureToken: true
    }

    this.auth.login(user).subscribe(() => {
      this.adminLoginForm.reset()
      this.router.navigate(['/admin','dashboard'])      
      this.submitted = false

    })
    
  }

}
