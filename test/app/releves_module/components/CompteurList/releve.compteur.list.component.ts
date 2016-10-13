import { Component, OnInit, HostBinding,
         trigger, transition, animate,
         style, state, Injectable } from '@angular/core';

import {Router, ActivatedRoute, Params} from '@angular/router';
import {Compteur} from "../../.././model/Compteur";
import {CompteurService} from "../../.././Services/CompteurService";
import {DBService} from "../../.././model/database";
import Dexie from "dexie";
import * as Rx from 'rxjs/Rx';

import {CompteurListComponent} from "../../../compteur_module/components/CompteurList/compteur.liste.component";


@Component({
	moduleId: module.id,
	selector: 'compteurs-list',
	template: `<h1> Compteurs </h1>
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
	        	<td><button class="btn" (click)="clickWatch(cpt)"> <span class="glyphicon glyphicon-eye-open" ></span> </button></td>
	        </tr>
        </tbody>
	</table>
    <router-outlet></router-outlet>
	`,
	 providers: [CompteurService, DBService]
})
@Injectable()
export class ReleveCompteurListComponent extends CompteurListComponent {
	
	constructor(CompteurService: CompteurService, DBService: DBService, route: ActivatedRoute, router: Router){
	 	super(CompteurService, DBService, route, router);
	 }

	 public clickWatch(cpt: Compteur){
	 	this.router.navigate(['/Releves/show/', cpt.name.toString()]);
	 }
	// public compteurs: Rx.Subject<Array<Compteur>>;
	// private selectedId: number;
	// public clickUpdate(cpt: Compteur) {
	// 	this.router.navigate(['/Compteurs', cpt.idCompteur.toString()]);
	// }

	// constructor(public CompteurService: CompteurService, private route: ActivatedRoute, private router: Router){
	// 	this.compteurs = this.CompteurService.getList();

	// }

	// ngOnInit() {
	// 	this.route.params.forEach((params: Params) => {
	// 		this.selectedId = +params['id'];
	// 		this.compteurs = this.CompteurService.getList();
	// 	});
	// }

	// isSelected(cpt: Compteur) {
	// 	return cpt.idCompteur === this.selectedId;
	//  }
}
