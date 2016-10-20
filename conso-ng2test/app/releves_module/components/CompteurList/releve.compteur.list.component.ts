import { Component, OnInit, OnDestroy, HostBinding,
	trigger, transition, animate,
	style, state, Output, EventEmitter, Injectable } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Compteur} from "../../../model/Compteur";
import {Releve} from "../../../model/Releve";
import {CompteurService} from "../../.././Services/CompteurService";
import {ReleveService} from "../../../Services/ReleveService";
import {DBService} from "../../.././model/database";
import { CompteurListComponent } from "../../../compteur_module/components/CompteurList/compteur.liste.component";
import * as Rx from 'rxjs/Rx';
import { Pipe, PipeTransform } from '@angular/core';


@Component({
	moduleId: module.id,
	selector: 'compteurs-list',
	template: `<h1> Compteurs </h1>
	<div class="table-responsive">
	<table class="table table-striped clickable-row">
		<thead>
            <tr>
                <th>id</th>
                <th>Nom</th>
                <th>Description</th>
                <th>Unité</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
	        <tr *ngFor="let cpt of compteurs | async"  [class.selected]="isSelected(cpt)" >
	        	<td>{{cpt.idCompteur}}</td>
	        	<td>{{cpt.name}}</td>
	        	<td>{{cpt.unity}}</td>
	        	<td>{{cpt.comment}}</td>
	        	<td><button class="btn" (click)="clickWatch(cpt)"><i class="fa fa-eye" aria-hidden="true"></i></button></td>
	        </tr>
        </tbody>
	</table>
	</div>
	`
})
@Injectable()
export class ReleveCompteurListComponent extends CompteurListComponent {
	
	constructor(CompteurService: CompteurService, DBService: DBService, route: ActivatedRoute, router: Router){
	 	super(CompteurService, DBService, route, router);
	 }

	 public clickWatch(cpt: Compteur){
	 	this.router.navigate(['/Releves/show/', cpt.name.toString()]);
	 }
}
