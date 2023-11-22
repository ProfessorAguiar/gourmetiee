import { Component, OnInit, Input } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut } from '@angular/fire/auth';
import { IonInput } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Input() texto = ''
  userPhoto: any
  userName = ''
  LoginComGoogle() {
    this.userPhoto = sessionStorage.getItem('fotoPerfil');
    if (this.userPhoto !== null) {
      this.logOut()
    } else {
      this.logar()
    }
  }
  logar() {
    const provider = new GoogleAuthProvider()
    signInWithPopup(this.auth, provider).then((res: any) => {
      console.log(res)
      const credential = GoogleAuthProvider.credentialFromResult(res);
      console.log(credential)
      this.userPhoto = res.user.photoURL;
      this.userName = res.user.displayName;
      console.log(this.userName)
      console.log(res.user)
      sessionStorage.setItem('Usuario', this.userName);
      sessionStorage.setItem('fotoPerfil', this.userPhoto);
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
    console.log('login com google')
  }

  logOut(){
    sessionStorage.clear();
    this.userPhoto=null
    this.userName=''
    return signOut(this.auth);
  }

  constructor(private auth: Auth) { }



  ngOnInit() { }

}
