import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, } from '@angular/router';
import { Observable } from 'rxjs';
// import { AuthService } from '../../Services/Auth/auth.service';
import { CommonService } from '../../Services/Common/common.service';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class NegAuthGuard implements CanActivate {

  constructor(
    // private authService: AuthService,
    private commonService: CommonService,
    public navCtrl: NavController,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {

    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user: firebase.User) => {
        if (user) {
          this.navCtrl.navigateRoot(['/dashboard']);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });

  }
}  
