import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  txt='Login com Google'
  constructor() { }
  userPhoto:any
  ngAfterViewInit(){
    this.userPhoto=sessionStorage.getItem('fotoPerfil');
    if(this.userPhoto!=null){
      this.txt='LogOut'
    }else{
      this.txt='Login com Google'
    }
  }

  ngOnInit(){
    this.userPhoto=sessionStorage.getItem('fotoPerfil');
    if(this.userPhoto!=null){
      this.txt='LogOut'
    }else{
      this.txt='Login com Google'
    }
  }


}
