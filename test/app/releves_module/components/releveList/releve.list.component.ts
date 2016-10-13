import {Component} from "@angular/core";
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Compteur} from "../../../model/Compteur";
import {Releve} from "../../../model/Releve";
import {CompteurService} from "../../../Services/CompteurService";
import {ReleveService} from "../../../Services/ReleveService";
import {DBService} from "../../../model/database";
import Dexie from "dexie";
import * as Rx from 'rxjs/Rx';


@Component({
	moduleId: module.id,
	selector: 'releve-list',
	template: `
	<div class="container">
		<h1> relevés faits sur : {{compteur?.name}} </h1>
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
		        	<td>{{rel.idReleve}}</td>
		        	<td>{{rel.date | date}}</td>
		        	<td>{{rel.valeur}}</td>
		        	<td>{{rel.comment}}</td>
		        </tr>
	        </tbody>
		</table>
	</div>
	`
})
export class ReleveListComponent {
	public releves: Rx.Subject<Array<Releve>>;
	public compteur: Compteur;

	public clickUpdate(cpt: Compteur) {
		this.router.navigate(['/Compteur', cpt.idCompteur.toString()]);
	}

	constructor(public CompteurService: CompteurService, public ReleveService: ReleveService, private route: ActivatedRoute, private router: Router){
	}

	ngOnInit() {
		this.route.params.forEach((params: Params) => {
			this.CompteurService.getByName(params['name']).subscribe((item) =>{
			this.compteur = item;
			this.releves = this.ReleveService.getByCompteur(this.compteur.idCompteur);
			});
		});
	}
}
