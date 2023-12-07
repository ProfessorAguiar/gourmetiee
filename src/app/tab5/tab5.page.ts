import { Component, OnInit, ViewChild } from '@angular/core';
import { doc, collection, setDoc, Firestore, getDocs } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  cardapioImages: any = []
  lojaImages: any = []
  imgC: any = ''
  imgL: any = ''
  @ViewChild(IonModal) modal?: IonModal;
  imgbool = false
  imgLbool = false
  foto: any
  imageRef: any

  cadastrarCardapio(produto: any, valor: any, descricao: any, qtd: any, cat: any) {
    const promo = {
      descricao: descricao,
      img: this.imgC,
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
  selectImg(img: any, modal: any) {
    this.imgC = img
    this.imgbool = true
    modal.dismiss()
  }

  selectImgLoja(img: any, modal: any) {
    this.imgL = img
    this.imgLbool = true
    modal.dismiss()
  }

  async GuardarFoto($event: any) {
    this.foto = $event.target.files[0]
    this.imageRef = ref(this.af, `cardapio/${this.foto.name}`)
    uploadBytes(this.imageRef, this.foto)
    this.cardapioImages=[]
    setTimeout(() => {
      this.listarFotos()
     }, 2000); 
  }

  async GuardarFotoLoja($event: any) {
    this.foto = $event.target.files[0]
    this.imageRef = ref(this.af, `lojas/${this.foto.name}`)
    uploadBytes(this.imageRef, this.foto)
    this.lojaImages=[]
    setTimeout(() => {
      this.listarFotos()
     }, 2000); 
  }

  ngOnInit(): void {
    this.listarFotos()
    this.listarFotosLojas()
    this.imgbool = false
    this.imgLbool = false
  }
  listarFotos() {
    listAll(ref(this.af, 'cardapio')).then(imgs => {
      imgs.items.forEach((im) => {
        //console.log(im.fullPath)
        //console.log(im.bucket)
        getDownloadURL(im).then((res) => {
          //console.log(res)
          this.cardapioImages.push(res)
        })
      })
    })
  }
  listarFotosLojas() {
    listAll(ref(this.af, 'lojas')).then(imgs => {
      imgs.items.forEach((im) => {
        getDownloadURL(im).then((res) => {
          this.cardapioImages.push(res)
        })
      })
    })
  }
  constructor(private firestore: Firestore, private af: Storage) { }



}
