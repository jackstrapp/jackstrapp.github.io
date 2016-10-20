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
const releve_home_component_1 = require('./components/releveHome/releve.home.component');
const empty_component_1 = require('./components/empty/empty.component');
const releve_list_component_1 = require('./components/releveList/releve.list.component');
const releve_compteur_list_component_1 = require('./components/CompteurList/releve.compteur.list.component');
const releve_saisie_component_1 = require('./components/releveSaisie/releve.saisie.component');
const app_routes_1 = require('./app.routes');
const ng_bootstrap_1 = require('@ng-bootstrap/ng-bootstrap');
let RelevesModule = class RelevesModule {
};
RelevesModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            app_routes_1.AppRoutingModule,
            ng_bootstrap_1.NgbModule.forRoot()
        ],
        declarations: [empty_component_1.EmptyComponent, releve_home_component_1.ReleveHomeComponent, releve_list_component_1.ReleveListComponent, releve_compteur_list_component_1.ReleveCompteurListComponent, releve_saisie_component_1.AddReleveComponent]
    }), 
    __metadata('design:paramtypes', [])
], RelevesModule);
exports.RelevesModule = RelevesModule;
//# sourceMappingURL=app.module.js.map