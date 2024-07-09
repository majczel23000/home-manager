import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';
import User = firebase.User;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  protected firestore = inject(AngularFirestore);

  readonly authState$: Observable<User | null> = this.fireAuth.authState;

  constructor(private fireAuth: AngularFireAuth) {}

  get user(): Observable<firebase.User | null> {
    return this.fireAuth.user;
  }

  login({ email, password}: Credentials) {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }
}

export interface Credentials {
  email: string;
  password: string;
}
