import { Component } from '@angular/core';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';
import { doc, collection, setDoc, Firestore, collectionData, getDocs } from '@angular/fire/firestore';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  promos: any = []
  promosName: any = []
  promosValor: any = []
  produto: any = []
  valorTotal: string = '0,00'
  count: number = 0;
  isModalOpen = false;
  cliente = sessionStorage.getItem('Usuario')
  fotoCliente = sessionStorage.getItem('fotoPerfil')
  setOpen(isOpen: boolean, imagem: any, Nome: any, Descricao: any, pValor: any, pQtd: any) {
    this.isModalOpen = isOpen;
    this.produto[0] = { pNome: Nome, pDescricao: Descricao, pValor: pValor, pImg: imagem, pQtd: pQtd }
    // this.produto[0]=[...this.produto, {pNome:Nome, pDescricao:Descricao, pValor:pValor, pImg:imagem, pQtd:pQtd}]
  }
  ngOnInit() {
    this.listar()
  }
  async listar() {
    const querySnapshot = await getDocs(collection(this.firestore, "promos"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()['promocao']}`);
      this.promos = [...this.promos, { img: doc.data()['img'], produto: doc.data()['promocao'], valor: doc.data()['valor'], descricao: doc.data()['descricao'], qtd: doc.data()['qtd'] }]
    });
  } 
  
  increment() {
    if (this.count < this.produto[0].pQtd) {
      this.count++;
      const a = (this.produto[0].pValor).replace(",", ".")
      console.log(a * this.count)
      this.valorTotal = String((a * this.count).toFixed(2))
      this.valorTotal = this.valorTotal.replace('.', ',')
    }
  }

  decrement() {
    if (this.count > 0) {
      this.count--;
      const a = (this.produto[0].pValor).replace(",", ".")
      console.log(a * this.count)
      this.valorTotal = String((a * this.count).toFixed(2))
      this.valorTotal = this.valorTotal.replace('.', ',')
    }
  }
  async addCarrinho() {
    // const carrinho = {
    //   cliente: '',
    //   fotoCliente: '',
    //   produtos:
    //     {
    //       produto: {
    //         nome: String(this.produto[0].pNome),
    //         descricao: String(this.produto[0].pDescricao),
    //         qtd: String(this.produto[0].pQtd),
    //         valor: String(this.produto[0].pValor),
    //         imagem: String(this.produto[0].pImg)
    //       },
    //     },
    //     valorTotal:String(this.valorTotal)
    // }
    // const document = doc(collection(this.firestore, 'Carrinho'));
    // return setDoc(document, carrinho);
    if (this.cliente !== null) {
      await setDoc(doc(this.firestore, "Carrinho", String(this.cliente)), {
        fotoCliente: String(this.fotoCliente),
        produtos: {
          produto: {
            nome: String(this.produto[0].pNome),
            descricao: String(this.produto[0].pDescricao),
            qtd: String(this.count),
            valor: String(this.produto[0].pValor),
            imagem: String(this.produto[0].pImg)
          },
        },
        valorTotal: String(this.valorTotal)
      });
    }else{
      alert('faça Login')
    }
  }
  constructor(private af: Storage, private firestore: Firestore) { }
}
