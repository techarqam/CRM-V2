import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from "@angular/fire/firestore";
import { first } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fireAuth: AngularFireAuth,
    private db: AngularFirestore,
  ) { }

  getUser(id) {
    return this.db.collection("Users").doc(id).snapshotChanges();
  }


  isLoggedIn() {
    return this.fireAuth.authState.pipe(first())
  }
  logout() {
    return this.fireAuth.auth.signOut();
  }


  loginM(data) {
    return this.fireAuth.auth.signInWithEmailAndPassword(data.email, data.pass)
  }


}
