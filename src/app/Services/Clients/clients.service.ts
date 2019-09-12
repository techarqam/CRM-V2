import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  dbRef = this.db.collection(`Clients`, ref => ref.orderBy('timestamp', 'desc'));

  constructor(
    public db: AngularFirestore,
  ) { }
  addClient(client) {
    return this.dbRef.add(client);
  }
  getClients() {
    return this.dbRef.snapshotChanges();
  }
  getSingleClient(clientId) {
    return this.dbRef.doc(clientId).snapshotChanges();
  }
  updateClients(client, clientId) {
    return this.dbRef.doc(clientId).update(client);
  }
  delClients(clientId) {
    return this.dbRef.doc(clientId).delete();
  }
  getClientProjects(clientId) {
    return this.db.collection(`Projects`, ref => ref.where("client", "==", clientId).orderBy('timestamp', 'desc')).snapshotChanges();
  }

}
