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
const Releve_1 = require("../../../model/Releve");
const CompteurService_1 = require("../../.././Services/CompteurService");
const ReleveService_1 = require("../../../Services/ReleveService");
let AddReleveComponent = class AddReleveComponent {
    constructor(route, router, cptService, relService) {
        this.route = route;
        this.router = router;
        this.cptService = cptService;
        this.relService = relService;
    }
    get openingAnimation() {
        return true;
    }
    get display() {
        return 'block';
    }
    get dateModel() {
        return this._dateModel;
    }
    set dateModel(date) {
        this._dateModel = date;
        this.releve.date = new Date(date.year, date.month - 1, date.day);
    }
    onChangeObj(newObj) {
        this.selectedCompteur = newObj;
    }
    formSubmit() {
        this.relService.add(this.releve)
            .subscribe((value) => {
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
    cancel() {
        this.router.navigate(['/Releves']);
    }
    ngOnInit() {
        this.compteurs = this.cptService.getList();
        this.releve = new Releve_1.Releve();
        var newDate = new Date();
        this.dateModel = { day: newDate.getUTCDate(), month: newDate.getUTCMonth() + 1, year: newDate.getUTCFullYear() };
        this.relService.getByCompteur(1).subscribe(function (x) {
            console.log(JSON.stringify(x));
        });
        this.relService.getByCompteur(2).subscribe(function (x) {
            console.log(JSON.stringify(x));
        });
    }
    ngOnDestroy() {
    }
};
__decorate([
    core_1.HostBinding('@openingAnimation'), 
    __metadata('design:type', Object)
], AddReleveComponent.prototype, "openingAnimation", null);
__decorate([
    core_1.HostBinding('style.display'), 
    __metadata('design:type', Object)
], AddReleveComponent.prototype, "display", null);
AddReleveComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-app',
        template: `
	<h2> Détails de votre relevé </h2>
	<form *ngIf="releve" (ngSubmit)="formSubmit()" >
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
			<input name="commentaire" type="text" class="form-control" [(ngModel)]="releve.comment" placeholder="Commentaire">
		</div>
		<div class="pull-right">
			<input type="submit" class="btn btn-success" value="Valider"/>
			<input type="button" class="btn btn-default" value="Annuler" (click)="cancel()"/>
		</div>
	</form>
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
    __param(2, core_1.Inject(CompteurService_1.CompteurService)),
    __param(3, core_1.Inject(ReleveService_1.ReleveService)), 
    __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, CompteurService_1.CompteurService, ReleveService_1.ReleveService])
], AddReleveComponent);
exports.AddReleveComponent = AddReleveComponent;
//# sourceMappingURL=releve.saisie.component.js.map