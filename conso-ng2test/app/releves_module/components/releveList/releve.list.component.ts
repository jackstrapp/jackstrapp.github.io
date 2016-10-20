import { Component, OnInit, OnDestroy, HostBinding,
	trigger, transition, animate,
	style, state, Output, EventEmitter, Inject } from '@angular/core';
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
		selector: 'releve-list',
		template: `
		<div class="container" id="releveList">
		<h1 class="pull-left"> {{compteur?.name}} </h1>
		<button class="btn btn-default pull-right" routerLink="/Releves/show" routerLinkActive="active">back</button>
		<div class="table-responsive">
		<table class="table table-striped clickable-row">
		<thead>
		<tr>
		<th>id</th>
		<th>Date</th>
		<th>Valeur ({{compteur?.unity}})</th>
		<th>Commentaire</th>
		</tr>
		</thead>
		<tbody>
		<tr *ngFor="let rel of releves | async" >
		<td>{{rel.idData}}</td>
		<td>{{rel.date | date}}</td>
		<td>{{rel.valeur}}</td>
		<td>{{rel.comment}}</td>
		</tr>
		</tbody>
		</table>
		</div>
		</div>
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
	export class ReleveListComponent implements OnInit, OnDestroy{
		@HostBinding('@openingAnimation') get openingAnimation() {
			return true;
		}

		@HostBinding('style.display') get display() {
			return 'block';
		}

		public releves: Rx.Subject<Array<Releve>>;
		public compteur: Compteur;


		constructor(@Inject(CompteurService) private CompteurService: CompteurService, @Inject(ReleveService)private ReleveService: ReleveService, private route: ActivatedRoute, private router: Router){

		}

		ngOnInit() {
			var name: string = null;
			this.route.params.forEach((params: Params) => {
				name = params['name'];
			});

			this.CompteurService.getByName(name).subscribe((item) => {
				this.compteur = item;

				this.releves = this.ReleveService.getByCompteur(this.compteur.idCompteur);
			});
		}

		ngOnDestroy() { 
		}
	}
