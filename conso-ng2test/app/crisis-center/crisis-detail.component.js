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
let CrisisDetailComponent = class CrisisDetailComponent {
    constructor(route, router) {
        this.route = route;
        this.router = router;
    }
    get routeAnimation() {
        return true;
    }
    get display() {
        return 'block';
    }
    get position() {
        return 'absolute';
    }
    ngOnInit() {
        this.route.data.forEach((data) => {
            this.editName = data.crisis.name;
            this.crisis = data.crisis;
        });
    }
    cancel() {
        this.gotoCrises();
    }
    save() {
        this.crisis.name = this.editName;
        this.gotoCrises();
    }
    gotoCrises() {
        let crisisId = this.crisis ? this.crisis.id : null;
        // Pass along the crisis id if available
        // so that the CrisisListComponent can select that crisis.
        // Add a totally useless `foo` parameter for kicks.
        // Relative navigation back to the crises
        this.router.navigate(['../', { id: crisisId, foo: 'foo' }], { relativeTo: this.route });
    }
};
__decorate([
    core_1.HostBinding('@routeAnimation'), 
    __metadata('design:type', Object)
], CrisisDetailComponent.prototype, "routeAnimation", null);
__decorate([
    core_1.HostBinding('style.display'), 
    __metadata('design:type', Object)
], CrisisDetailComponent.prototype, "display", null);
__decorate([
    core_1.HostBinding('style.position'), 
    __metadata('design:type', Object)
], CrisisDetailComponent.prototype, "position", null);
CrisisDetailComponent = __decorate([
    core_1.Component({
        template: `
  <div *ngIf="crisis">
    <h3>"{{editName}}"</h3>
    <div>
      <label>Id: </label>{{crisis.id}}</div>
    <div>
      <label>Name: </label>
      <input [(ngModel)]="editName" placeholder="name"/>
    </div>
    <p>
      <button (click)="save()">Save</button>
      <button (click)="cancel()">Cancel</button>
    </p>
  </div>
  `,
        styles: ['input {width: 20em}'],
        animations: [
            core_1.trigger('routeAnimation', [
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
    __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router])
], CrisisDetailComponent);
exports.CrisisDetailComponent = CrisisDetailComponent;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=crisis-detail.component.js.map