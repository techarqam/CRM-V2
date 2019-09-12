import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  dbRef = this.db.collection(`Projects`, ref => ref.orderBy('timestamp', 'desc'));

  constructor(
    public db: AngularFirestore,
  ) { }

  addProject(project) {
    return this.dbRef.add(project).then(newProj => {
      return newProj.id;
    });
  }
  getProjects() {
    return this.db.collection(`Projects`, ref => ref.where("archived", "==", false).orderBy('timestamp', 'desc')).snapshotChanges();
  }
  getSingleProject(projectId) {
    return this.dbRef.doc(projectId).snapshotChanges();
  }
  updateProjects(project, projectId) {
    return this.dbRef.doc(projectId).update(project);
  }
  delProjects(projectId) {
    return this.dbRef.doc(projectId).delete();
  }
  getArchivedProjects() {
    return this.db.collection(`Projects`, ref => ref.where("archived", "==", true).orderBy('timestamp', 'desc')).snapshotChanges();
  }
  archiveProject(projectId) {
    return this.db.collection('Projects').doc(projectId).update({ archived: true });
  }
  unArchiveProject(projectId) {
    return this.db.collection('Projects').doc(projectId).update({ archived: false });
  }
  getFiles(projectId) {
    return this.db.collection('Files', ref => ref.where("project", "==", projectId)).snapshotChanges();
  }
}
