import { Component, Input, OnInit, inject } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from '@angular/material/icon';
import { filter } from 'rxjs';
import { AuthService } from '../../shared/services/login/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatMenuModule,
    MatIconModule,
    CommonModule,
  ],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() sideNav: MatSidenav | undefined;

  protected router = inject(Router);
  protected authService = inject(AuthService);

  public backButtonVisibility = false;

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event: any) => event instanceof NavigationEnd)
      ).subscribe((event: any) => this.backButtonVisibility = event.url !== '/dashboard');
  }

  public goBack(): void {
    window.history.back();
  }

}
