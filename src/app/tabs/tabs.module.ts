import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';

import { CarrinhoComponent } from '../Components/carrinho/carrinho.component';
import { LoginBadgeComponent } from '../Components/login-badge/login-badge.component';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage, CarrinhoComponent, LoginBadgeComponent]
})
export class TabsPageModule {}
