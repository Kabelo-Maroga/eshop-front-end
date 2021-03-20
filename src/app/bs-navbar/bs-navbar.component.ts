import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent {

  user$: Observable<firebase.User>;

  constructor(public auth: AuthService) {
  }

  logout(): void {
    this.auth.logout();
  }

}
