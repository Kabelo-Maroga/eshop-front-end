import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent {

  user$: Observable<firebase.User>;

  constructor(public auth: AuthenticationService) {
  }

  logout(): void {
    this.auth.logout();
  }

}
