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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
const core_1 = require('@angular/core');
const router_1 = require('@angular/router');
const CompteurService_1 = require("../../.././Services/CompteurService");
const ReleveService_1 = require("../../../Services/ReleveService");
let ReleveListComponent = class ReleveListComponent {
    constructor(CompteurService, ReleveService, route, router) {
        this.CompteurService = CompteurService;
        this.ReleveService = ReleveService;
        this.route = route;
        this.router = router;
    }
    get openingAnimation() {
        return true;
    }
    get display() {
        return 'block';
    }
    clickWatch(rel) {
        if (confirm("do you want to delete this read?")) {
            this.ReleveService.delete(rel);
            this.ngOnInit();
        }
    }
    ngOnInit() {
        var name = null;
        this.route.params.forEach((params) => {
            name = params['name'];
        });
        this.CompteurService.getByName(name).subscribe((item) => {
            this.compteur = item;
            this.releves = this.ReleveService.getByCompteur(this.compteur.idCompteur);
        });
    }
    ngOnDestroy() {
    }
};
__decorate([
    core_1.HostBinding('@openingAnimation'), 
    __metadata('design:type', Object)
], ReleveListComponent.prototype, "openingAnimation", null);
__decorate([
    core_1.HostBinding('style.display'), 
    __metadata('design:type', Object)
], ReleveListComponent.prototype, "display", null);
ReleveListComponent = __decorate([
    core_1.Component({
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
		<th>Action</th>
		</tr>
		</thead>
		<tbody>
		<tr *ngFor="let rel of releves | async" >
		<td>{{rel.idData}}</td>
		<td>{{rel.date | date}}</td>
		<td>{{rel.valeur}}</td>
		<td>{{rel.comment}}</td>
		<td><button class="btn" (click)="clickWatch(rel)"><i class="fa fa-trash" aria-hidden="true"></i></button></td>
		</tr>
		</tbody>
		</table>
		</div>
		</div>
		`,
        animations: [
            core_1.trigger('openingAnimation', [
                core_1.state('*', core_1.style({
                    opacity: 1,
                    transform: 'translateX(0)'
                })),
                core_1.transition('void => *', [
                    core_1.style({
                        opacity: 0,
                        transform: 'translateX(-100%)'
                    }),
                    core_1.animate('0.2s ease-in')
                ]),
                core_1.transition('* => void', [
                    core_1.animate('0.5s ease-out', core_1.style({
                        opacity: 0,
                        transform: 'translateY(100%)'
                    }))
                ])
            ])
        ]
    }),
    __param(0, core_1.Inject(CompteurService_1.CompteurService)),
    __param(1, core_1.Inject(ReleveService_1.ReleveService)), 
    __metadata('design:paramtypes', [CompteurService_1.CompteurService, ReleveService_1.ReleveService, router_1.ActivatedRoute, router_1.Router])
], ReleveListComponent);
exports.ReleveListComponent = ReleveListComponent;
//# sourceMappingURL=releve.list.component.js.map