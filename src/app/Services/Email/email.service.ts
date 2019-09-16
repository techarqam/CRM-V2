import { Injectable } from '@angular/core';
    import { AngularFirestore } from '@angular/fire/firestore';
    @Injectable({
      providedIn: 'root'
    })
    export class EmailService {
      dbRef = this.db.collection('Email ', ref => ref.orderBy('timestamp', 'desc'));
      constructor(
        public db: AngularFirestore,
      ) { }
      addEmail(email) {
        return this.dbRef.add(email);
      }
      getEmails() {
        return this.dbRef.snapshotChanges();
      }
      getSingleEmail(emailId) {
        return this.dbRef.doc(emailId).snapshotChanges();
      }
      updateEmails(email, emailId) {
        return this.dbRef.doc(emailId).update(email);
      }
      delEmails(emailId) {
        return this.dbRef.doc(emailId).delete();
      }
      }
    