import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  selUserId: string = "";

  constructor(
    private router: ActivatedRoute,
  ) {
    this.router.params.subscribe(params => {
      if (params['id'] != undefined) {
        this.selUserId = params['id'];
      }
      console.log(this.selUserId);
    });
  }

  ngOnInit() { }

}
