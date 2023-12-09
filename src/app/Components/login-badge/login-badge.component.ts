import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Console } from 'console';
import { LoginService } from 'src/app/Services/login.service';
@Component({
  selector: 'app-login-badge',
  templateUrl: './login-badge.component.html',
  styleUrls: ['./login-badge.component.scss'],
})
export class LoginBadgeComponent implements OnInit, OnChanges {
  userPhoto?: any
  logado?: boolean=false


  public alertButtons = ['OK'];
  public alertInputs = [
    {
      placeholder: 'Name',
    },
    {
      placeholder: 'Nickname (max 8 characters)',
      attributes: {
        maxlength: 8,
      },
    },
    {
      type: 'number',
      placeholder: 'Age',
      min: 1,
      max: 100,
    },
    {
      type: 'textarea',
      placeholder: 'A little about yourself',
    },
  ];


  async logarComGoogle() {
    this.ls.LoginComGoogle()
   setTimeout(() => {
    this.on()
   }, 5000); 
  }
  async logoutApp() {
    this.ls.LoginComGoogle()
    setTimeout(() => {
      this.out()
     }, 5000); 
  }
  constructor(private ls: LoginService) { }
  on() {
    this.userPhoto = sessionStorage.getItem('fotoPerfil')
    this.logado = true
  }
  out() {
    this.logado = false
  }
  ngOnInit() {
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes')
  }
}
