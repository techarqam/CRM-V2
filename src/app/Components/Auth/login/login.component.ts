import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/Services/Common/common.service';
import { ModelsService } from 'src/app/Models/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private modelService: ModelsService,
    public commonService: CommonService,
    public navCtrl: NavController,
  ) { }

  ngOnInit() { }



  onSubmit() {
    let data = this.modelService.signIn.value;
    this.authService.loginM(data).then(res => {
      this.modelService.signIn.reset();
    }).catch(err => {
      this.commonService.presentToast(err.message);
    }).then(() => {
      if (this.authService.isLoggedIn()) {
      }else{
        this.navCtrl.navigateRoot('/login');
      }
    });
  }

}
