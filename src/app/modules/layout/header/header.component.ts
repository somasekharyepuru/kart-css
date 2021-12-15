import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentication/components/auth.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { debounceTime, takeUntil } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { CartService } from '../../cart/cart.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchForm = new FormControl('');
  isLoggedIn: boolean = false;
  currentUser: User | null;
  destroy = new Subject();
  cartCount = 0;
  constructor(
    public authService: AuthService,
    public router: Router,
    private cartService: CartService
  ) {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (!!this.isLoggedIn) {
      this.currentUser = this.authService.getUserInfo();
    } else {
      this.currentUser = null;
    }
    this.cartService.cartDetails.pipe(takeUntil(this.destroy)).subscribe( data => {
      this.cartCount = data.length;
    })
  }

  ngOnInit(): void {
    this.authService.authState.subscribe( data => {
      console.log(data, 'data here')
      this.isLoggedIn = Boolean(data);
      this.currentUser = this.authService.getUserInfo();
    })
    this.searchForm.valueChanges.pipe(debounceTime(1000)).subscribe( data => {
      console.log(data, 'data here in the things')
      // please write logic here to get the items from the backend
    })
  }

  search(event: any) {
    // this.searchKey = (event.target as HTMLInputElement).value;
    // this.cartService.searchKey.next(this.searchKey);
  }

  logout() {
    this.authService.logout();
  }

  onDestroy() {
    this.destroy.next(true);
    this.destroy.complete();
  }

}
