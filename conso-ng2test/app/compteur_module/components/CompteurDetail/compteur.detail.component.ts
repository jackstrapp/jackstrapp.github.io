import { Component, OnInit, OnDestroy, HostBinding,
         trigger, transition, animate,
         style, state, Output, EventEmitter } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import {Compteur} from "../../../model/Compteur";
import {CompteurService} from "../../../Services/CompteurService";
import {DBService} from "../../../model/database";
import Dexie from "dexie";
import * as Rx from 'rxjs/Rx';


@Component({
	moduleId: module.id,
	selector: 'my-app',
	template: 
	`
	<h1> Détail du compteur </h1>
	<form *ngIf="compteur" (ngSubmit)="formSubmit()" >
	   <div class="form-group">
	    <label>id</label>
	    <input name="id" required class="form-control" [ngModel]="compteur.idCompteur" readonly placeholder="id">
	  </div>
	   <div class="form-group">
	    <label>Name</label>
	    <input name="name" type="text" required class="form-control" [(ngModel)]="compteur.name" placeholder="name">
	  </div>
	   <div class="form-group">
	    <label>Comment</label>
	    <input name="comment" type="text" required class="form-control" [(ngModel)]="compteur.comment" placeholder="water reader under sink">
	  </div>
	   <div class="form-group">
	    <label>Unity</label>
	    <input name="unity" type="text" required class="form-control" [(ngModel)]="compteur.unity" placeholder="unity">
	  </div>
	   <div class="form-group">
	    <label>Price (per unity)</label>
	    <input name="price" type="number" class="form-control" [(ngModel)]="compteur.price"  placeholder="15.2$" step="0.00001">
	  </div>
	   <div class="form-group">
	    <label>Color</label>
	     <input type="color" name="color" [(ngModel)]="compteur.color">
	     {{compteur.color}}
	  </div>


	  <div class="pull-right">
		  <input type="submit" class="btn btn-success" value="Valider"/>
		  <input type="button" class="btn btn-default" value="Annuler" (click)="gotoCompteurs()"/>
	  </div>
	</form>
	`
	 ,
	animations: [
		trigger('openingAnimation', [
			state('*',
				style({
					opacity: 1,
					transform: 'translateX(0)'
				})
				),
			transition('void => *', [
				style({
					opacity: 0,
					transform: 'translateX(-100%)'
				}),
				animate('0.2s ease-in')
				]),
			transition('* => void', [
				animate('0.5s ease-out', style({
					opacity: 0,
					transform: 'translateY(100%)'
				}))
				])
			])
	]
})
export class CompteurDetailComponent implements OnInit, OnDestroy{
	@HostBinding('@openingAnimation') get openingAnimation() {
		return true;
	}

	@HostBinding('style.display') get display() {
		return 'block';
	}

	public compteur: Compteur;

	public formSubmit(){
		this.service.update(this.compteur).subscribe((value: Compteur) => {
			this.gotoCompteurs(true);
		}, (error) => {
			alert(error);
		});
	}



	public gotoCompteurs(submitedScreen?: Boolean) { 
		debugger;
		let compteurId = this.compteur ? this.compteur.idCompteur : null;
		// Pass along the crisis id if available
		// so that the CrisisListComponent can select that crisis.
		// Add a totally useless `foo` parameter for kicks.
		// Relative navigation back to the crises
		if(compteurId && submitedScreen)
			this.router.navigate(['/Compteurs', { id: compteurId, foo: 'foo' }]);
		else
			this.router.navigate(['/Compteurs']);

	}

	constructor(private route: ActivatedRoute, private router: Router, private service: CompteurService) {
	}

	ngOnInit() {

		this.route.params.forEach((params: Params) => {
		     let id = +params['id']; // (+) converts string 'id' to a number
		     this.service.get(id).subscribe((cpt) => {
		     	this.compteur = cpt;
		     });
		 });
	}

	ngOnDestroy() { 
	}


}


@Component({template: ''})
export class CompteurDetailEmptyComponent{}