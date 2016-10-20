import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { ReleveHomeComponent} from './components/releveHome/releve.home.component';
import { EmptyComponent } from './components/empty/empty.component';
import { ReleveListComponent } from './components/releveList/releve.list.component';
import { ReleveCompteurListComponent } from './components/CompteurList/releve.compteur.list.component';
import { AddReleveComponent } from './components/releveSaisie/releve.saisie.component';
import { AppRoutingModule } from './app.routes';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
	imports: [ 
	BrowserModule,
	FormsModule,
	AppRoutingModule
	 ,
	 NgbModule.forRoot()
	],
	declarations: [ EmptyComponent, ReleveHomeComponent, ReleveListComponent, ReleveCompteurListComponent, AddReleveComponent ]
})
export class RelevesModule {

}
