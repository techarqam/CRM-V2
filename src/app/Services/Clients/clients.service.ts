import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(
    public db: AngularFirestore,
  ) { }
  addClient(client) {
    return this.db.collection(`Clients`, ref => ref.orderBy('timestamp', 'desc')).add(client);
  }
  getClients(comp) {
    return this.db.collection(`Clients`, ref => ref.orderBy('timestamp', 'desc').where("company", "==", comp)).snapshotChanges();
  }
  getSingleClient(clientId) {
    return this.db.collection(`Clients`, ref => ref.orderBy('timestamp', 'desc')).doc(clientId).snapshotChanges();
  }
  updateClients(client) {
    return this.db.collection(`Clients`, ref => ref.orderBy('timestamp', 'desc')).doc(client.id).update(client);
  }
  delClients(clientId) {
    return this.db.collection(`Clients`, ref => ref.orderBy('timestamp', 'desc')).doc(clientId).delete();
  }
  getClientProjects(clientId,comp) {
    return this.db.collection(`Projects`, ref => ref.where("client", "==", clientId).where("company", "==", comp).orderBy('timestamp', 'desc')).snapshotChanges();
  }

}
