import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import {EmptyComponent} from './components/empty/empty.component';
import { ReleveHomeComponent} from './components/releveHome/releve.home.component';
import { ReleveCompteurListComponent} from './components/CompteurList/releve.compteur.list.component';
import { ReleveListComponent } from './components/releveList/releve.list.component';
import { AddReleveComponent } from './components/releveSaisie/releve.saisie.component';

@NgModule({
	imports: [
	RouterModule.forChild([
		{path: 'Releves', component: ReleveHomeComponent},
		{path: 'Releves/show', component: ReleveCompteurListComponent, children: [
			{path: '', component: EmptyComponent},
			{path: ':name', component: ReleveListComponent}
		]},
		{path: 'Releves/make', component: AddReleveComponent}
		// {path: 'Compteurs', component: CompteurListComponent, children: [
		// {
		// 	path: ':id',
		// 	component: CompteurDetailComponent
		// },
		// {
		// 	path: '',
		// 	component: ComteurDetailEmptyComponent
		// }
		// ]}
		])
	],
	exports: [
	RouterModule
	]
})
export class AppRoutingModule {}