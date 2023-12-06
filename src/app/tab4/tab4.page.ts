import { Component, OnInit } from '@angular/core';
import { doc, collection, setDoc, Firestore, getDocs } from '@angular/fire/firestore';
import { StorageService } from '../Services/storage.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  lojas: any=[]


  constructor(private firestore: Firestore, private stsv: StorageService) { }

  ngOnInit() {
    this.listar()
  }
  async listar() {
    const querySnapshot = await getDocs(collection(this.firestore, "lojas"));
    querySnapshot.forEach((doc) => {
      this.lojas = [...this.lojas, { img: doc.data()['imagem'], loja: doc.data()['loja'] }]
    });
  }
}
