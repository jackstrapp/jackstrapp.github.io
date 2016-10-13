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
class Crisis {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
exports.Crisis = Crisis;
const CRISES = [
    new Crisis(1, 'Dragon Burning Cities'),
    new Crisis(2, 'Sky Rains Great White Sharks'),
    new Crisis(3, 'Giant Asteroid Heading For Earth'),
    new Crisis(4, 'Procrastinators Meeting Delayed Again'),
];
let crisesPromise = Promise.resolve(CRISES);
const core_1 = require('@angular/core');
let CrisisService_1 = class CrisisService {
    getCrises() { return crisesPromise; }
    getCrisis(id) {
        return crisesPromise
            .then(crises => crises.find(crisis => crisis.id === +id));
    }
    addCrisis(name) {
        name = name.trim();
        if (name) {
            let crisis = new Crisis(CrisisService_1.nextCrisisId++, name);
            crisesPromise.then(crises => crises.push(crisis));
        }
    }
};
let CrisisService = CrisisService_1;
CrisisService.nextCrisisId = 100;
CrisisService = CrisisService_1 = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], CrisisService);
exports.CrisisService = CrisisService;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=crisis.service.js.map