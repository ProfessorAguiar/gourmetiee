import { Component, OnInit } from '@angular/core';
import { doc, collection, setDoc, Firestore, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  cadastrarPromo(produto: any, valor: any, descricao: any, qtd: any, imagem: any) {
    const promo = {
      descricao: descricao,
      img: imagem,
      promocao: produto,
      qtd: qtd,
      valor: valor,
    }
    const document = doc(collection(this.firestore, 'promos'));
    return setDoc(document, promo);
  }
  ngOnInit(): void {

  }
  constructor(private firestore: Firestore) { }



}
