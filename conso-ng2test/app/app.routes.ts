import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { RelevesModule } from './releves_module/app.module';
import {CompteurModule} from './compteur_module/app.module';
import {GraphModule} from './Graph_module/app.module';
import {CrisisCenterModule} from './crisis-center/crisis-center.module';

import { MainMenuComponent } from './main/main.menu.component';

@NgModule({
	imports: [
	RelevesModule,
	CompteurModule,
	GraphModule,
	CrisisCenterModule,
	 RouterModule.forRoot([{
	 	path: '', 
	 	component: MainMenuComponent
	 }])
	],
	exports: [
	RouterModule
	]
})
export class AppRoutingModule {}