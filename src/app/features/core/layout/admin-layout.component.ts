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
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, CommonModule,
    // UserProfileComponent, SnackbarComponent, FooterComponent
  ]
})
export class AdminLayoutComponent implements OnInit {
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

  navs = [
    {
      title: 'Home',
      url: '/',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"' +
        'd="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />'
    },
    {
      title: 'Products',
      url: '/products',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"' +
        'd="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />'
    },
    {
      title: 'Inventory',
      url: '/inventory',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"' +
        'd="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />'
    },
    {
      title: 'Quotations',
      url: '/quotations',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"' +
        'd="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />'
    },
    {
      title: 'Orders',
      url: '/orders',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"' +
        'd="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />'
    },
    {
      title: 'Customers',
      url: '/customers',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"' +
        'd="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />'
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"' +
        'd="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />'
    }
  ]
}
