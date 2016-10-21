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
let CompteurDetailComponent = class CompteurDetailComponent {
    constructor(route, router, service) {
        this.route = route;
        this.router = router;
        this.service = service;
    }
    get openingAnimation() {
        return true;
    }
    get display() {
        return 'block';
    }
    formSubmit() {
        this.service.update(this.compteur).subscribe((value) => {
            this.gotoCompteurs(true);
        }, (error) => {
            alert(error);
        });
    }
    gotoCompteurs(submitedScreen) {
        debugger;
        let compteurId = this.compteur ? this.compteur.idCompteur : null;
        // Pass along the crisis id if available
        // so that the CrisisListComponent can select that crisis.
        // Add a totally useless `foo` parameter for kicks.
        // Relative navigation back to the crises
        if (compteurId && submitedScreen)
            this.router.navigate(['/Compteurs', { id: compteurId, foo: 'foo' }]);
        else
            this.router.navigate(['/Compteurs']);
    }
    ngOnInit() {
        this.route.params.forEach((params) => {
            let id = +params['id']; // (+) converts string 'id' to a number
            this.service.get(id).subscribe((cpt) => {
                this.compteur = cpt;
            });
        });
    }
    ngOnDestroy() {
    }
};
__decorate([
    core_1.HostBinding('@openingAnimation'), 
    __metadata('design:type', Object)
], CompteurDetailComponent.prototype, "openingAnimation", null);
__decorate([
    core_1.HostBinding('style.display'), 
    __metadata('design:type', Object)
], CompteurDetailComponent.prototype, "display", null);
CompteurDetailComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-app',
        template: `
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
    __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, CompteurService_1.CompteurService])
], CompteurDetailComponent);
exports.CompteurDetailComponent = CompteurDetailComponent;
let CompteurDetailEmptyComponent = class CompteurDetailEmptyComponent {
};
CompteurDetailEmptyComponent = __decorate([
    core_1.Component({ template: '' }), 
    __metadata('design:paramtypes', [])
], CompteurDetailEmptyComponent);
exports.CompteurDetailEmptyComponent = CompteurDetailEmptyComponent;
//# sourceMappingURL=compteur.detail.component.js.map