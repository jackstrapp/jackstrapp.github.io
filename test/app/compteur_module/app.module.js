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
const forms_1 = require('@angular/forms');
const platform_browser_1 = require('@angular/platform-browser');
const compteur_detail_component_1 = require('./components/CompteurDetail/compteur.detail.component');
const compteur_liste_component_1 = require('./components/CompteurList/compteur.liste.component');
const page_not_found_component_1 = require('./components/PageNotFound/page.not.found.component');
const app_routes_1 = require('./app.routes');
let CompteurModule = class CompteurModule {
};
CompteurModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, app_routes_1.AppRoutingModule],
        declarations: [compteur_detail_component_1.CompteurDetailComponent, compteur_liste_component_1.CompteurListComponent, page_not_found_component_1.PageNotFoundComponent, compteur_detail_component_1.CompteurDetailEmptyComponent],
        bootstrap: [compteur_liste_component_1.CompteurListComponent]
    }), 
    __metadata('design:paramtypes', [])
], CompteurModule);
exports.CompteurModule = CompteurModule;
//# sourceMappingURL=app.module.js.map