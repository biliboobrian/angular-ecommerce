import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router, ResolveEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: firebase.User = null;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  signIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password).then((result) => {
      this.user = result.user;
    });
  }

  get isLoggedIn(): Promise<boolean> {
    return new Promise(
      (resolve, reject) => {
        this.afAuth.onAuthStateChanged(user => {
            if(user) {
              this.user = user;
              resolve(true);
            } else {
              resolve(false);
            }
          }
        );
      }
    );
  }
  
  signOut() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['login']);
    })
  }
}
