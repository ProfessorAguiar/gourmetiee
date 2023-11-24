import { Component, OnInit } from '@angular/core';
import { doc, collection, setDoc, Firestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

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

constructor(private firestore: Firestore) { }

ngOnInit() {
}

}
