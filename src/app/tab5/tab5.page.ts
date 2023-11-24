import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  txt='Login com Google'
  user=false
  constructor() { }
  userPhoto:any
  userName:any
  ngAfterViewInit(){
    this.userPhoto=sessionStorage.getItem('fotoPerfil');
    this.userName=sessionStorage.getItem('Usuario');
    if(this.userPhoto!=null){
      this.txt='LogOut'
      this.user=true
    }else{
      this.txt='Login com Google'
      this.user=false
    }
  }

  ngOnInit(){
    this.userPhoto=sessionStorage.getItem('fotoPerfil');
    this.userName=sessionStorage.getItem('Usuario');
    if(this.userPhoto!=null){
      this.txt='LogOut'
      this.user=true
    }else{
      this.txt='Login com Google'
      this.user=false
    }
  }


}
