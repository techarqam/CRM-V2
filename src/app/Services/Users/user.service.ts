import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";
import * as moment from 'moment';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {



  constructor(
    private db: AngularFirestore,
    private fireAuth: AngularFireAuth,
    public authService: AuthService,
  ) {
  }
  //Add User
  getUser(id) {
    return this.db.collection("Users").doc(id).snapshotChanges();
  }

  addUser(nUser) {
    let user: any;
    this.db.collection("Users").doc(firebase.auth().currentUser.uid).snapshotChanges().subscribe(snap => {
      user = snap.payload.data();
      this.fireAuth.auth.createUserWithEmailAndPassword(nUser.email, nUser.password).then(res => {
        this.db.collection(`Users`).doc(`${res.user.uid}`).set(nUser).then(() => {
          this.fireAuth.auth.signInWithEmailAndPassword(user.email, user.password);
        });
      });
      console.log("nUser", nUser)
      console.log("cUser", user);
    });
  }

  // Get Users
  getUsers(company) {
    return this.db.collection(`Users`, ref => ref.where("company", "==", company)).snapshotChanges();
  }
  getSingleUser(userId) {
    return this.db.collection(`Users`).doc(userId).snapshotChanges();
  }

  activateUser(userId) {
    return this.db.collection('Users').doc(userId).update({ active: true });
  }
  deactivateUser(userId) {
    return this.db.collection('Users').doc(userId).update({ active: false });
  }
  async delUser(userId) {
    let oUser: any = {}; let nUser: any = {};
    this.getSingleUser(userId).subscribe(snap => {
      nUser = snap.payload.data();
      this.getSingleUser(firebase.auth().currentUser.uid).subscribe(snapi => {
        oUser = snapi.payload.data();
        this.fireAuth.auth.signInWithEmailAndPassword(nUser.email, nUser.password).then(() => {
          this.fireAuth.auth.currentUser.delete().then(() => {
            this.fireAuth.auth.signInWithEmailAndPassword(oUser.email, oUser.password);
          })
        })
      })
    })
  }

}
