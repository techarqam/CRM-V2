import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/Services/Users/user.service';
import { CommonService } from 'src/app/Services/Common/common.service';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private userService: UserService,
    public navCtrl: NavController,
    public commonService: CommonService,
    public db: AngularFirestore,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {

    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user: firebase.User) => {
        if (user) {
          this.userService.getSingleUser(user.uid).subscribe(snap => {
            let temp: any = snap.payload.data();
            if (temp.active) {
              resolve(true);
            } else {
              this.authService.logout().then(() => {
                this.commonService.presentToast("You have been deactivated");
              })
            }
          })
        } else {
          this.navCtrl.navigateRoot(['/login']);
          resolve(false);
        }
      });
    });

  }
}