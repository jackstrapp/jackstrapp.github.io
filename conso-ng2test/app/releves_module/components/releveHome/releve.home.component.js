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
let ReleveHomeComponent = class ReleveHomeComponent {
};
ReleveHomeComponent = __decorate([
    core_1.Component({
        template: `
		<h1> Relevés </h1>
		<h4> Que voulez-vous faire?</h4>
		<p>
		  <button type="button" routerLink="/Releves/make" routerLinkActive="active" class="btn btn-primary btn-lg">Faire un relevé</button>
		  <button type="button" routerLink="/Releves/show" routerLinkActive="active" class="btn btn-default btn-lg">Visualiser les relevés</button>
		</p>

	`
    }), 
    __metadata('design:paramtypes', [])
], ReleveHomeComponent);
exports.ReleveHomeComponent = ReleveHomeComponent;
//# sourceMappingURL=releve.home.component.js.map