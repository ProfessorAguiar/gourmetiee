import { Injectable } from '@angular/core';
import { doc, collection, setDoc, Firestore, collectionData, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  lojas: any = []
  async getLojas() {
    let lojasArray:any=[]
    const querySnapshot = await getDocs(collection(this.firestore, "lojas"));
    querySnapshot.forEach(async (doc) => {
      console.log(`${doc.id} => ${doc.data()['loja']}`);
      lojasArray = [...lojasArray, {img: doc.data()['imagem'], loja: doc.data()['loja']}]
    });
    return await lojasArray
  }
  async getPromos(){

  }
  async getCardapio(){

  }
  constructor(private firestore:Firestore) { }
}
