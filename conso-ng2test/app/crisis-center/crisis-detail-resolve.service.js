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
let CrisisDetailResolve = class CrisisDetailResolve {
    constructor(cs, router) {
        this.cs = cs;
        this.router = router;
    }
    resolve(route) {
        let id = +route.params['id'];
        return this.cs.getCrisis(id).then(crisis => {
            if (crisis) {
                return crisis;
            }
            else {
                this.router.navigate(['/crisis-center']);
                return false;
            }
        });
    }
};
CrisisDetailResolve = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [crisis_service_1.CrisisService, router_1.Router])
], CrisisDetailResolve);
exports.CrisisDetailResolve = CrisisDetailResolve;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=crisis-detail-resolve.service.js.map