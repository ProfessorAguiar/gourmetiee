import { Component } from '@angular/core';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  userPhoto:any
  logado=false
  ngOnChanges(){
    this.userPhoto=sessionStorage.getItem('fotoPerfil');
    if(this.userPhoto!=null){
      this.logado=true
    }else{
      this.logado=false
    }
  }

  ngOnInit(){
    this.userPhoto=sessionStorage.getItem('fotoPerfil');
    if(this.userPhoto!=null){
      this.logado=true
    }else{
      this.logado=false
    }
  }

  constructor() {}

}
