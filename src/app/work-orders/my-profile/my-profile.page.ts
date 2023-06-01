import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {User} from "../../auth/user.model";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  user: User;

  constructor(private authService: AuthService) { }

  ngOnInit() {

    this.authService.user.subscribe((user)=>{
      this.user=user;
    });
    console.log(this.user);
  }

}
