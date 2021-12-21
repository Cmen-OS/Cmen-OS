import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gerencial',
  templateUrl: './gerencial.component.html',
  styleUrls: ['./gerencial.component.css']
})
export class GerencialComponent implements OnInit {
  myVar:String = "https://images.unsplash.com/photo-1637354563042-9a1d26500ff5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzNzk4NjMyMw&ixlib=rb-1.2.1&q=80&w=1080";
  saldoTotal = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
