"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require("@angular/core");
const router_1 = require('@angular/router');
const CompteurService_1 = require("../../../Services/CompteurService");
const ReleveService_1 = require("../../../Services/ReleveService");
let ReleveListComponent = class ReleveListComponent {
    constructor(CompteurService, ReleveService, route, router) {
        this.CompteurService = CompteurService;
        this.ReleveService = ReleveService;
        this.route = route;
        this.router = router;
    }
    clickUpdate(cpt) {
        this.router.navigate(['/Compteur', cpt.idCompteur.toString()]);
    }
    ngOnInit() {
        this.route.params.forEach((params) => {
            this.CompteurService.getByName(params['name']).subscribe((item) => {
                this.compteur = item;
                this.releves = this.ReleveService.getByCompteur(this.compteur.idCompteur);
            });
        });
    }
};
ReleveListComponent = __decorate([
    core_1.Component({
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
    }), 
    __metadata('design:paramtypes', [CompteurService_1.CompteurService, ReleveService_1.ReleveService, router_1.ActivatedRoute, router_1.Router])
], ReleveListComponent);
exports.ReleveListComponent = ReleveListComponent;
//# sourceMappingURL=releve.list.component.js.map