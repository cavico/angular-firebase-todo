import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  constructor(
    public afAuth: AngularFireAuth
  ) {}

  googleLogin() {
    this.afAuth.signInWithPopup(new auth.GoogleAuthProvider()).then(
      response => {
        sessionStorage.setItem('uid', response.user.uid);
      }
    );
  }

  logout() {
    this.afAuth.signOut().then(
      () => {
        sessionStorage.removeItem('uid');
      }
    );
  }
}
