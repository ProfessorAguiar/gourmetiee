import { Component, OnInit } from '@angular/core';
import { doc, collection, setDoc, Firestore, collectionData, getDocs, query, where } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss'],
})
export class CarrinhoComponent implements OnInit {
  carrinhoItems: any = []
  cItems: any = ''
  cliente: string = ''
  fotoCliente: string = ''
  valorTotalItem: number = 0
  compraTotal: number = 0
  constructor(private firestore: Firestore, private toastController: ToastController) { }

  ngOnInit() {
    this.listarItems()
  }

  async listarItems() {
    const q = query(collection(this.firestore, "Carrinho"), where('cliente', '==', 'Vinicius Aguiar'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.data());
      console.log(doc.data()['cliente']);
      console.log(doc.data()['fotoCliente']);
      console.log(doc.data()['produtos']['produto']['nome']);
      console.log(doc.data()['produtos']['produto']['descricao']);
      console.log(doc.data()['produtos']['produto']['imagem']);
      console.log(doc.data()['produtos']['produto']['qtd']);
      console.log(doc.data()['produtos']['produto']['valor']);
      console.log(doc.data()['valorTotal']);
      this.carrinhoItems = [...this.carrinhoItems, { cliente: doc.data()['cliente'], fotoCliente: doc.data()['fotoCliente'], produto: doc.data()['produtos']['produto']['nome'], descricao: doc.data()['produtos']['produto']['descricao'], fotoProduto: doc.data()['produtos']['produto']['imagem'], qtd: doc.data()['produtos']['produto']['qtd'], valor: doc.data()['produtos']['produto']['valor'], valorTotal: doc.data()['valorTotal'] }]
      this.cliente = doc.data()['cliente']
      this.fotoCliente = doc.data()['fotoCliente']
      this.valorTotalItem = (doc.data()['valorTotal'])
      this.compraTotal = this.valorTotalItem
    });
    // querySnapshot.forEach((doc) => {
    //   const a=doc.data()

    //   console.log(a)
    //   //console.log(`${doc.id} => ${doc.data()['produtos']}`);
    //   //this.carrinhoItems = [...this.carrinhoItems, { img: doc.data()['img'], produto: doc.data()['promocao'], valor: doc.data()['valor'], descricao: doc.data()['descricao'], qtd: doc.data()['qtd'] }]
    // });
  }
  apagaItem() {
    this.addCarrinho()
    this.presentToast()
    this.carrinhoItems = []
    this.cItems = ''
    this.cliente = ''
    this.fotoCliente = ''
    this.valorTotalItem = 0
    this.compraTotal = 0
    this.listarItems()

  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Item Apagado com Sucesso!',
      duration: 2500,
      position: 'bottom',
    });

    await toast.present();
  }

  async addCarrinho() {
    await setDoc(doc(this.firestore, "Carrinho", String(this.cliente)), {
      cliente: String(this.cliente),
      fotoCliente: String(this.fotoCliente),
      produtos: {
        produto: {
          nome: '',
          descricao: '',
          qtd: '',
          valor: '',
          imagem: ''
        },
      },
      valorTotal: ''
    });
  }

}
