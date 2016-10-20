import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { CompteurDetailComponent,  CompteurDetailEmptyComponent}  from './components/CompteurDetail/compteur.detail.component';
import { CompteurListComponent }  from './components/CompteurList/compteur.liste.component';
import {PageNotFoundComponent} from './components/PageNotFound/page.not.found.component';

import { AppRoutingModule } from './app.routes';



@NgModule({
	imports: [ BrowserModule, FormsModule, AppRoutingModule ],
	declarations: [  CompteurDetailComponent,  CompteurListComponent, PageNotFoundComponent, CompteurDetailEmptyComponent ],
	bootstrap: [ CompteurListComponent ]
})
export class CompteurModule { }
