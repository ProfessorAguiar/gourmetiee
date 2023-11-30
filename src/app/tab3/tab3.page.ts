import { Component } from '@angular/core';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';
import { doc, collection, setDoc, Firestore, collectionData, getDocs } from '@angular/fire/firestore';
import { NOMEM } from 'dns';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  promos:any=[]
  promosName:any=[]
  promosValor:any=[]
  produto:any=[]
  valorTotal:any=0
  count:number = 0;
  isModalOpen = false;
  setOpen(isOpen: boolean, imagem:any, Nome:any, Descricao:any, pValor:any, pQtd:any) {
    this.isModalOpen = isOpen;
    this.produto[0]={pNome:Nome, pDescricao:Descricao, pValor:pValor, pImg:imagem, pQtd:pQtd}
    // this.produto[0]=[...this.produto, {pNome:Nome, pDescricao:Descricao, pValor:pValor, pImg:imagem, pQtd:pQtd}]
  }
  ngOnInit() {
    this.listar()
  }
  async listar(){
  const querySnapshot = await getDocs(collection(this.firestore, "promos"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()['promocao']}`);
      this.promos=[...this.promos,{img:doc.data()['img'], produto:doc.data()['promocao'], valor:doc.data()['valor'], descricao:doc.data()['descricao'],qtd:doc.data()['qtd']}]
    });
  }
  increment() {
    this.count++;
    const a=(this.produto[0].pValor).replace(",", ".")
    console.log(a*this.count)
    this.valorTotal=a*this.count
    
  }

  decrement() {
    this.count--;
    this.valorTotal=this.produto.pValor*this.count
  }
  addCarrinho(){
    localStorage.setItem('produto', this.produto[0]);
    localStorage.setItem('valor total', this.valorTotal);
  }
  constructor(private af:Storage, private firestore: Firestore) {}
}
