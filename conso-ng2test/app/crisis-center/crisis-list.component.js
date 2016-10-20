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
const crisis_service_1 = require('./crisis.service');
let CrisisListComponent = class CrisisListComponent {
    constructor(service, route, router) {
        this.service = service;
        this.route = route;
        this.router = router;
    }
    isSelected(crisis) {
        return crisis.id === this.selectedId;
    }
    ngOnInit() {
        this.route.params.forEach((params) => {
            this.selectedId = params['id'];
            this.service.getCrises()
                .then(crises => this.crises = crises);
        });
    }
    onSelect(crisis) {
        this.selectedId = crisis.id;
        // Navigate with relative link
        this.router.navigate([crisis.id], { relativeTo: this.route });
    }
};
CrisisListComponent = __decorate([
    core_1.Component({
        template: `
    <ul class="list-group">
    <button type="button" class="list-group-item"
    *ngFor="let crisis of crises" class="list-group-item"
        [class.selected]="isSelected(crisis)"
        (click)="onSelect(crisis)">
      <span class="badge">{{crisis.id}}</span> {{crisis.name}}
    </button>

      
    </ul>

    <router-outlet></router-outlet>
  `
    }), 
    __metadata('design:paramtypes', [crisis_service_1.CrisisService, router_1.ActivatedRoute, router_1.Router])
], CrisisListComponent);
exports.CrisisListComponent = CrisisListComponent;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=crisis-list.component.js.map