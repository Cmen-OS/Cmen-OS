import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";

import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {


  count = 0;



  constructor(
    private router: Router,

    private  cookieService:CookieService,
    private data:DataService,
  ) {
  }

  ngOnInit() {
    this.data.count.subscribe(c => {
      this.count = c;
    });


  }




  showAdmin() {
    // @ts-ignore
    if ( localStorage.getItem('user').toString() == 'admin'){

      return {'display' : ''};

    } else {
      return {'display' : 'none'};
    }

  }

  nextCount() {
    this.data.nextCount();
    console.log(this.count)
  }

  showBar() {
    if ( window.location.href.toString() == "http://localhost:4200/login" || window.location.href.toString() == "http://localhost:8081/login" || window.location.href.toString() == "34.139.8.186"){
      return {'display' : 'none'};

    } else {
      return {'display' : ''};
    }
  }


  salir() {
    this.cookieService.delete('logged')
    this.router.navigateByUrl('/login');

  }
}
