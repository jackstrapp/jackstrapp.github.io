import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import { AppRoutingModule } from './app.routes';
import {EmptyComponent} from './main/main.empty.component';
import { MainMenuComponent } from './main/main.menu.component';

import {DBService} from './model/database';
import { CompteurService } from './Services/CompteurService';
import { ReleveService } from './Services/ReleveService';
import { Compteur } from './model/Compteur';
import { Releve } from './model/Releve';


@NgModule({
	imports: [ BrowserModule, FormsModule, AppRoutingModule, NgbModule.forRoot() ],
	declarations: [ AppComponent, MainMenuComponent ],
	providers: [ DBService, CompteurService, ReleveService,  {provide: LocationStrategy, useClass: HashLocationStrategy} ],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
