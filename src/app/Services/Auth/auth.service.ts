import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from "@angular/fire/firestore";
import { first } from 'rxjs/operators';
import * as firebase from 'firebase';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  id: string;

  public company: Observable<any>;


  constructor(
    private fireAuth: AngularFireAuth,
    private db: AngularFirestore,
  ) {

    firebase.auth().onAuthStateChanged((user: firebase.User) => {
      if (user) {
        this.id = user.uid;
      }
    })


  }

  getCompany() {
    return new Promise((resolve, reject) => {
      this.db.collection("Users").doc(this.id).snapshotChanges().subscribe(snap => {
        let temp: any = snap.payload.data();
        resolve(temp.company);
      })
    })
  }

  getUser() {
    return this.db.collection("Users").doc(this.id).snapshotChanges();
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
