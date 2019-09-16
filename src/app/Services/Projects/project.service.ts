import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  dbRef = this.db.collection(`Projects`, ref => ref.orderBy('timestamp', 'desc'));
  constructor(
    public db: AngularFirestore,
    public authService: AuthService,
  ) {
  }


  addProject(project) {
    return this.dbRef.add(project).then(newProj => {
      return newProj.id;
    })
  }
  getProjects(company) {
    return this.db.collection(`Projects`, ref => ref.where("archived", "==", false).where("company", "==", company).orderBy('timestamp', 'desc')).snapshotChanges();
  }
  getSingleProject(projectId) {
    return this.dbRef.doc(projectId).snapshotChanges();
  }
  updateProjects(project) {
    return this.dbRef.doc(project.id).update(project);
  }
  delProjects(projectId) {
    return this.dbRef.doc(projectId).delete();
  }
  getArchivedProjects(company) {
    return this.db.collection(`Projects`, ref => ref.where("archived", "==", true).where("company", "==", company).orderBy('timestamp', 'desc')).snapshotChanges();
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
