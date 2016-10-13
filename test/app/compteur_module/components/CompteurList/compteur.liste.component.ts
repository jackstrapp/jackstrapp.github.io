import { Component, OnInit, HostBinding,
         trigger, transition, animate,
         style, state, Inject, Injectable } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Compteur} from "../../../model/Compteur";
import {CompteurService} from "../../../Services/CompteurService";
import {ReleveService} from "../../../Services/ReleveService";
import {DBService} from "../../../model/database";
import Dexie from "dexie";
import * as Rx from 'rxjs/Rx';


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
	        	<td><button class="btn" (click)="clickUpdate(cpt)">update</button></td>
	        </tr>
        </tbody>
	</table>
    <router-outlet></router-outlet>
	`

	
})
export class CompteurListComponent {

	constructor(public CompteurService: CompteurService, public DBService: DBService, protected route: ActivatedRoute, protected router: Router){
		this.compteurs = this.CompteurService.getList();

	}

	

	public compteurs: Rx.Subject<Array<Compteur>>;
	private selectedId: number;
	public clickUpdate(cpt: Compteur) {
		this.router.navigate(['/Compteurs', cpt.idCompteur.toString()]);
	}

	ngOnInit() {
		this.route.params.forEach((params: Params) => {
			this.selectedId = +params['id'];
			this.compteurs = this.CompteurService.getList();
		});
	}

	isSelected(cpt: Compteur) {
		return cpt.idCompteur === this.selectedId;
	 }
}
