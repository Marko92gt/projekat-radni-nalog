import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject} from 'rxjs';
import {User} from './user.model';
import {map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

interface AuthResponseData{
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registred?: boolean;

}

interface UserData{
  name?: string;
  surname?: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isUserAuthenticated=false;
  private _user=new BehaviorSubject<User>(null);

  constructor(private http: HttpClient,private router: Router) { }

  get isUserAuthenticated(){
    return this._user.asObservable().pipe(
      map((user)=>{
        if(user){
          return !!user.token;

        }else{
          return false;
        }
      })
    );
  }

  get userId(){
    return this._user.asObservable().pipe(
      map((user)=>{
        if(user){
          return user.id;

        }else{
          return null;
        }
      })
    );
  }

  get user(){
    return this._user.asObservable().pipe(
      map((user)=>{
        if(user){
          return user;

        }else{
          return null;
        }
      })
    );
  }

  logIn(user: UserData){
    this._isUserAuthenticated=true;

    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIkey}`,
      {email: user.email, password: user.password, returnSecureToken: true})
      .pipe(
        tap((userData)=>{
          const expirationTime=new Date(new Date().getTime()+ +userData.expiresIn *1000);
          const user=new User(userData.localId,userData.email,userData.idToken, expirationTime);
          this._user.next(user);
        })
      );

  }
  logOut(){
    console.log('logout 2');
    this._user.next(null);
    this.router.navigateByUrl('/log-in');
  }

  register(user: UserData){
    this._isUserAuthenticated=true;
   return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIkey}`,
     {email: user.email, password: user.password, returnSecureToken: true}).
   pipe(
     tap((userData)=>{
       const expirationTime=new Date(new Date().getTime()+ +userData.expiresIn *1000);
       const user=new User(userData.localId,userData.email,userData.idToken, expirationTime);
       this._user.next(user);
     })
   );;
  }
}
