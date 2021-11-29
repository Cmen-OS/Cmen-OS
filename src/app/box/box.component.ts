import { Component, OnInit, Input } from '@angular/core';
import { Box } from 'src/app/models/box.model';


@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {

  @Input() box:Box = {
    id: '',
    name: '',
    price: 0,
  }

  constructor() { }

  ngOnInit(): void {
  }

}
