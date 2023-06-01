import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {

  }

  onLogIn(form: NgForm){
    console.log(form);
    this.authService.logIn(form.value).subscribe(resData=>{
      console.log('Prijava uspesna');
      console.log(resData);
      this.router.navigateByUrl("work-orders/tabs/explore");
    });

  }


}
