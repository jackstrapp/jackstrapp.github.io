import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CompteurDetailComponent, CompteurDetailEmptyComponent } from './components/CompteurDetail/compteur.detail.component';
import { CompteurListComponent } from './components/CompteurList/compteur.liste.component';
import { PageNotFoundComponent } from './components/PageNotFound/page.not.found.component';

@NgModule({
	imports: [
		RouterModule.forRoot([
			{ path: 'Compteurs', component: CompteurListComponent },
			{ path: 'Compteurs/:id', component: CompteurDetailComponent }
		])]
	,
	exports: [
		RouterModule
	]
})
export class AppRoutingModule { }