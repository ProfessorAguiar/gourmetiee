import { Component, OnInit } from '@angular/core';
import { doc, collection, setDoc, Firestore, getDocs } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  cardapioImages: any = []

  cadastrarCardapio(produto: any, valor: any, descricao: any, qtd: any, imagem: any, cat: any) {
    const promo = {
      descricao: descricao,
      img: imagem,
      promocao: produto,
      qtd: qtd,
      valor: valor,
      categoria: cat
    }
    if (cat != undefined) {
      const document = doc(collection(this.firestore, 'cardapio'));
      return setDoc(document, promo);
    }
    return (
      console.log('erro de validação')
    )
  }

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
  cadastrarLoja(loja: any, imagem: any) {
    const Addloja = {
      loja: loja,
      imagem: imagem
    }
    const document = doc(collection(this.firestore, 'lojas'));
    return setDoc(document, Addloja);
  }


  
  
  ngOnInit(): void {
  listAll(ref(this.af, 'cardapio')).then(imgs => {
    imgs.items.forEach((im) => {
      //console.log(im.fullPath)
      //console.log(im.bucket)
      getDownloadURL(im).then((res) => {
        console.log(res)
        this.cardapioImages.push(res)
      })
    })
  })
}
constructor(private firestore: Firestore, private af: Storage) { }



}
