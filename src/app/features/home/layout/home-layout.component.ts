import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { AuthService } from '../../../../services/auth.service';
// import { CartService } from '../../services/cart.service';
// import { WishlistService } from '../../services/wishlist.service';
// import { UserProfileComponent } from '../../../../shared/components/user-profile/user-profile.component';
// import { SnackbarComponent } from '../../../../shared/components/snackbar/snackbar.component';
// import { FooterComponent } from '../../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, CommonModule,
    // UserProfileComponent, SnackbarComponent, FooterComponent
  ]
})
export class HomeLayoutComponent implements OnInit {
  showProfileModal = false;

  appName = 'Textil ERP';
  panelName = 'Admin Panel';

  constructor(
    // public authService: AuthService,
    // public cartService: CartService,
    // public wishlistService: WishlistService
  ) { }

  ngOnInit() {
    // this.cartService.loadCart().subscribe();
    // this.wishlistService.loadWishlist().subscribe();
  }

  logout() {
    // this.authService.logout();
  }

  toggleProfileModal() {
    this.showProfileModal = !this.showProfileModal;
  }

  // get userName(): string {
  //   return this.authService.currentUserValue?.name || 'Customer';
  // }

  // get userProfileImage(): string {
  //   return this.authService.currentUserValue?.profileImage || '';
  // }
}
