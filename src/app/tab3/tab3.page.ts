import { Component } from '@angular/core';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';
import { doc, collection, setDoc, Firestore, collectionData, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  promos:any=[]
  promosName:any=[]
  promosValor:any=[]
  ngOnInit() {
    // listAll(ref(this.af, 'promo')).then(imgs => {
    //   imgs.items.forEach((im) => {
    //     getDownloadURL(im).then((res) => {
    //       this.promos.push(res)
    //     })
    //   })
    // })
    this.listar()
  }
  async listar(){
  const querySnapshot = await getDocs(collection(this.firestore, "promos"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()['promocao']}`);
      this.promos=[...this.promos,{img:doc.data()['img'], produto:doc.data()['promocao'], valor:doc.data()['valor']}]
    });
  }
  constructor(private af:Storage, private firestore: Firestore) {}

}
