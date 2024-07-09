import { Component, inject, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/login/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  protected authService = inject(AuthService);
  protected router = inject(Router);

  public error = false;
  public login = '';
  public password = '';
  public loginInProgress = false;

  public onSubmit(): void {
    if (!this.login || !this.password) {
      return;
    }
    this.loginInProgress = true;

    this.authService.login({ email: this.login, password: this.password }).then((res) => {
      this.router.navigateByUrl('/dashboard');
    })
    .catch(() => {
      this.error = true;
    })
    .finally(() => {
      this.loginInProgress = false;
    });

  }

}
