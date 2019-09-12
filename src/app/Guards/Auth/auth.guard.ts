import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { CommonService } from 'src/app/Services/Common/common.service';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    // private authService: AuthService,
    private commonService: CommonService,
    public navCtrl: NavController,
    public db: AngularFirestore,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {

    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user: firebase.User) => {
        if (user) {
          resolve(true);
        } else {
          this.navCtrl.navigateRoot(['/login']);
          resolve(false);
        }
      });
    });

  }
}