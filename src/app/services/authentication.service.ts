import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) {
      this.user$ = afAuth.authState;
  }

  login(): void {
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout(): void {
    this.afAuth.signOut();
  }
}
