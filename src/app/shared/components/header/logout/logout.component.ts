import { AuthStoreService } from './../../../stores/auth.store';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss',
})
export class LogoutComponent {
  authStoreService = inject(AuthStoreService);
  isLoggedIn$ = this.authStoreService.isLoggedIn$();

}
