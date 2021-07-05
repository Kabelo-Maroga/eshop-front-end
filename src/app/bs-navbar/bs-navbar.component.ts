import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase';
import {Observable, Subscription} from 'rxjs';
import { IAppUser } from '../models/app-user';
import {AuthService} from '../services/auth.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent implements OnInit {

  appUser: IAppUser;
  cart: any;
  shoppingCartItemCount: number;
  
  subcription: Subscription;

  constructor(public auth: AuthService, private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    let subcription = (await this.shoppingCartService.getCart()).snapshotChanges()
      .subscribe(cart => {
        this.cart = cart.payload.val();
        this.shoppingCartItemCount = 0;

        for(let productId in this.cart.items) {
          this.shoppingCartItemCount += this.cart.items[productId].quantity;
        }
      });
  }

  logout(): void {
    this.auth.logout();
  }

}
