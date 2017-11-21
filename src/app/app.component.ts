import { Component, OnInit } from '@angular/core';
import { MessageService } from './message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Hey ho, the Shopify Killer is near!';

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messageService.add('MessageService: App ready!');
  }
}
