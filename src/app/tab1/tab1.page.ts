import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { IonicSlides } from '@ionic/angular';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';
import { doc, collection, setDoc, Firestore, collectionData, getDocs } from '@angular/fire/firestore';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from '@angular/fire/auth';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  cardapioImages:any=[]
  swiperModules = [IonicSlides];
  constructor(private af:Storage) {}
  ngOnInit() {
    listAll(ref(this.af, 'cardapio')).then(imgs => {
      imgs.items.forEach((im) => {
        //console.log(im.fullPath)
        //console.log(im.bucket)
        getDownloadURL(im).then((res) => {
          console.log(res)
          this.cardapioImages.push(res)
        })

      })
      //console.log(imgs.items)
      // imgs.items.forEach(val=>{
      //   getDownloadURL(val).then(url=>{
      //     this.imgUrl(data=>[...],url)
      //   })
      // })
    })
  }
}
