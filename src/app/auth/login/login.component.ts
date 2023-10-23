import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { NumbersOnlyDirective } from 'src/app/base/directives/numbers-only.directive';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
//  import { ToastrService } from 'ngx-toastr';








// import { UsersService } from 'src/app/users.service';
// import { NumbersOnlyDirective } from 'src/app/numbers-only.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  data: any;

  constructor(

    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.ininForm();
  }



  ininForm() {

    this.loginForm = this.fb.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]

    })



  }


  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }



  submit() {

    // console.log(this.loginForm.get('username')?.value)


    this.data = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,

    }
    //  console.log(data);

    if (this.loginForm.invalid) {

    }
    else {
      this.authService.signIn(this.data.username, this.data.password).pipe(
        map((res) => {
         
          
          const uDetail=JSON.stringify(res.userDetail.data)
          localStorage.setItem('userdetails', uDetail);
          if (res) {
            const token = "Basic " + btoa(this.data.username + ":" + this.data.password);
            // const token = window.btoa(`${this.data.username}:${this.data.password}`);
            localStorage.setItem('token', token);
          }

          this.toastr.success('Logged in successfully');
          this.router.navigate(['/pages/task'])
        })
      ).subscribe()
    }
  }


}


