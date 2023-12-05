import { Injectable } from '@angular/core';
import { doc, collection, setDoc, Firestore, collectionData, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  lojas: any = []
  async listar() {
    const querySnapshot = await getDocs(collection(this.firestore, "lojas"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()['loja']}`);
      this.lojas = [...this.lojas, {img: doc.data()['imagem'], loja: doc.data()['loja']}]
    });
  }
  constructor(private firestore:Firestore) { }
}
