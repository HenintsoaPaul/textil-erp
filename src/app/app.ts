import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('textil-erp');
  protected isProfileMenuOpen = signal(false);

  toggleProfileMenu() {
    this.isProfileMenuOpen.update(v => !v);
  }
}
