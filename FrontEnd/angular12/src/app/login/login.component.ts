import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service:SharedService) { }

  user:any;
  
  UserId:string | undefined;
  UserName:string | undefined;
  UserLastName:string | undefined; 
  UserPassword:string | undefined;
  UserPosition:string | undefined;

  UsersList:any = [];

  ngOnInit(): void {
    this.loadUsersList();
  }

  loadUsersList(){
    this.service.getUserList().subscribe((data:any)=>{
      this.UsersList=data;

      this.UserId=this.user.UserId;
      this.UserName=this.user.UserName;
      this.UserLastName=this.user.UserLastName;
      this.UserPassword=this.user.UserPassword;
      this.UserPosition=this.user.UserPosition;
    });
  }


  addUser(){
    var val = {UserId:this.UserId,
                UserName:this.UserName,
                UserLastName:this.UserLastName,
                UserPassword:this.UserPassword,
                UserPosition:this.UserPosition};

    this.service.addUser(val).subscribe(res=>{
      alert(res.toString());
    });
  }

  updateUser(){
    var val = {UserId:this.UserId,
      UserName:this.UserName,
      UserLastName:this.UserLastName,
      UserPassword:this.UserPassword,
      UserPosition:this.UserPosition};

    this.service.updateUser(val).subscribe(res=>{
    alert(res.toString());
    });
  }

}
function Input() {
  throw new Error('Function not implemented.');
}

