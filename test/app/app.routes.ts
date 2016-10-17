import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { RelevesModule } from './releves_module/app.module';
import {CompteurModule} from './compteur_module/app.module';
import {CrisisCenterModule} from './crisis-center/crisis-center.module';

import {DBService} from './model/database';
import { CompteurService } from './Services/CompteurService';
import { ReleveService } from './Services/ReleveService';
import { Compteur } from './model/Compteur';
import { Releve } from './model/Releve';
import { MainMenuComponent } from './main/main.menu.component';

@NgModule({
	imports: [
	RelevesModule,
	CompteurModule,
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