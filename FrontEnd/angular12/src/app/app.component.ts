import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'zooSystem';
  img = 'https://images.unsplash.com/photo-1636827001898-53208629c7bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzNzk2NTMzNA&ixlib=rb-1.2.1&q=80&w=1080'
  title = "zoo";

  isAdmin:Boolean = false;
}
