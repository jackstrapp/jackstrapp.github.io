import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { CompteurDetailComponent, CompteurDetailEmptyComponent }  from './components/CompteurDetail/compteur.detail.component';
import { CompteurListComponent }  from './components/CompteurList/compteur.liste.component';
import {PageNotFoundComponent} from './components/PageNotFound/page.not.found.component';

@NgModule({
	imports: [
	RouterModule.forRoot([
		{path: 'Compteurs', component: CompteurListComponent, children: [
			{
                path: ':id',
                component: CompteurDetailComponent
              },
              {
                path: '',
                component: CompteurDetailEmptyComponent
              }
		]}
		])]
		,
	exports: [
	RouterModule
	]
})
export class AppRoutingModule {}