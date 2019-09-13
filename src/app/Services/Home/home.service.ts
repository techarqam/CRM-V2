import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFirestore } from '@angular/fire/firestore';
import * as moment from 'moment';
import { AngularFireAuth } from '@angular/fire/auth';
import { CommonService } from '../Common/common.service';
@Injectable({
  providedIn: 'root'
})
export class HomeService {


  constructor(
    private db: AngularFirestore,
    private fireAuth: AngularFireAuth,
    public commonService: CommonService,
  ) { }


  signUpCompany(data) {
    let tempPass = this.createPassword();
    let company: any = {
      companyName: data.companyName,
      admin: "",
      timestamp: moment().format()
    };
    let user: any = {
      name: data.adminName,
      email: data.email,
      password: tempPass,
      status: "Unverified",
      active: true,
      isAdmin: true,
      addedBy: "",
      timestamp: moment().format()
    };

    return this.fireAuth.auth.createUserWithEmailAndPassword(data.email, tempPass).then(admin => {
      company.admin = admin.user.uid;
      this.db.collection("Companies").add(company).then(company => {
        user.company = company.id;
        user.addedBy = admin.user.uid;
        this.db.collection("Users").doc(admin.user.uid).set(user)
          .catch(err => { this.commonService.presentToast(err); });
      }).catch(err => { this.commonService.presentToast(err); });
    }).catch(err => { this.commonService.presentToast(err); });

  }




  createPassword() {
    let length = 16;
    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let retVal: string = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }


}
