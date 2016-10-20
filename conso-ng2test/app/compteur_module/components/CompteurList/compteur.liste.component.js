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
const core_1 = require('@angular/core');
const router_1 = require('@angular/router');
const CompteurService_1 = require("../../../Services/CompteurService");
const database_1 = require("../../../model/database");
let CompteurListComponent = class CompteurListComponent {
    constructor(CompteurService, DBService, route, router) {
        this.CompteurService = CompteurService;
        this.DBService = DBService;
        this.route = route;
        this.router = router;
    }
    clickUpdate(cpt) {
        this.router.navigate(['/Compteurs', cpt.idCompteur.toString()]);
    }
    ngOnInit() {
        this.route.params.forEach((params) => {
            this.selectedId = +params['id'];
            this.compteurs = this.CompteurService.getList();
        });
    }
    isSelected(cpt) {
        return cpt.idCompteur === this.selectedId;
    }
};
CompteurListComponent = __decorate([
    core_1.Component({
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
		        	<td><button class="btn" (click)="clickUpdate(cpt)">update</button></td>
		        </tr>
	        </tbody>
		</table>
	</div>
	`
    }), 
    __metadata('design:paramtypes', [CompteurService_1.CompteurService, database_1.DBService, router_1.ActivatedRoute, router_1.Router])
], CompteurListComponent);
exports.CompteurListComponent = CompteurListComponent;
//# sourceMappingURL=compteur.liste.component.js.map