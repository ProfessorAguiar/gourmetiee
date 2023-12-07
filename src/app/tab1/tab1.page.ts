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
  cardapio: any = []
  produto: any = []
  swiperModules = [IonicSlides];
  valorTotal: string = '0,00'
  count: number = 0;
  isModalOpen = false;
  constructor(private af: Storage, private firestore:Firestore) { }
  ngOnInit() {
    this.listar()
  }
  async listar() {
    const querySnapshot = await getDocs(collection(this.firestore, "promos"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()['promocao']}`);
      this.cardapio = [...this.cardapio, { img: doc.data()['img'], produto: doc.data()['promocao'], valor: doc.data()['valor'], descricao: doc.data()['descricao'], qtd: doc.data()['qtd'] }]
    });
  }
  setOpen(isOpen: boolean, imagem: any, Nome: any, Descricao: any, pValor: any, pQtd: any) {
    this.isModalOpen = isOpen;
    this.produto[0] = { pNome: Nome, pDescricao: Descricao, pValor: pValor, pImg: imagem, pQtd: pQtd }
    // this.produto[0]=[...this.produto, {pNome:Nome, pDescricao:Descricao, pValor:pValor, pImg:imagem, pQtd:pQtd}]
  }
}
