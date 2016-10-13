import { Component, OnInit, OnDestroy, HostBinding,
	trigger, transition, animate,
	style, state, Output, EventEmitter } from '@angular/core';

	import { Router, ActivatedRoute, Params } from '@angular/router';
	import {Compteur} from "../../../model/Compteur";
	import {Releve} from "../../../model/Releve";

	import {CompteurService} from "../../.././Services/CompteurService";
	import {ReleveService} from "../../../Services/ReleveService";
	import {DBService} from "../../.././model/database";
	import * as Rx from 'rxjs/Rx';

	import { Pipe, PipeTransform } from '@angular/core';


	@Component({
		moduleId: module.id,
		selector: 'my-app',
		template: 
		`
		<h2> Détails de votre relevé </h2>
		<form *ngIf="releve" (ngSubmit)="formSubmit()" >
		{{_dateModel | json}} --- 
		{{releve | json}}
		<div class="form-group">
		<label>idCompteur</label>
		<select [(ngModel)]="releve.idCompteur" (ngModelChange)="onChangeObj($event)" name="compteur" class="form-control">
		<option [ngValue]="i.idCompteur" *ngFor="let i of compteurs | async">{{i.name}}</option>
		</select>
		</div>
		<div class="form-group">
		<label>Date</label>
		<ngb-datepicker name="date" [(ngModel)]="dateModel"></ngb-datepicker>

		</div>
		<div class="form-group">
		<label>Valeur</label>
		<input name="valeur" type="number" required class="form-control" [(ngModel)]="releve.valeur" placeholder="Valeur">
		</div>
		<div class="form-group">
		<label>Commentaire</label>
		<input name="commentaire" type="text" required class="form-control" [(ngModel)]="releve.comment" placeholder="Commentaire">
		</div>
		<div class="pull-right">
		<input type="submit" class="btn btn-success" value="Valider"/>
		<input type="button" class="btn btn-default" value="Annuler" (click)="cancel()"/>
		</div>
		</form>
		`,
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
	export class AddReleveComponent implements OnInit, OnDestroy{
		@HostBinding('@openingAnimation') get openingAnimation() {
			return true;
		}

		@HostBinding('style.display') get display() {
			return 'block';
		}

	//{ day: value.getUTCDay(), month: value.getUTCMonth(), year: value.getUTCFullYear()}

	public _dateModel: any;

	get dateModel(): any{
		return this._dateModel;
	}

	set dateModel(date: any){
		this._dateModel = date;
		this.releve.date = new Date(date.year, date.month - 1, date.day);
	}

	public selectedCompteur: Compteur;
	public onChangeObj(newObj: Compteur) {
		this.selectedCompteur = newObj;
	}

	constructor(private route: ActivatedRoute, private router: Router, private cptService: CompteurService, private relService: ReleveService) {
	}

	public releve: Releve;

	public compteurs: Rx.Subject<Compteur[]>;


	public formSubmit(){
		this.relService.add(this.releve)
		.subscribe((value: Releve) => {
			alert('insert validé');
			this.cancel();
		}, (error) => {
			alert(error);
		});
		// this.service.update(this.compteur).subscribe((value: Compteur) => {
		// 	this.gotoCompteurs(true);
		// }, (error) => {
		// 	alert(error);
		// });
	}

	public cancel() { 
		this.router.navigate(['/Releves']);
	}


	ngOnInit() {
		this.compteurs = this.cptService.getList();
		this.releve = new Releve();
		debugger;
		var newDate = new Date();
		this.dateModel = { day: newDate.getUTCDate(), month: newDate.getUTCMonth() + 1, year: newDate.getUTCFullYear()};
	}

	ngOnDestroy() { 
	}


}
