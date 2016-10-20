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
const releve_home_component_1 = require('./components/releveHome/releve.home.component');
const releve_compteur_list_component_1 = require('./components/CompteurList/releve.compteur.list.component');
const releve_list_component_1 = require('./components/releveList/releve.list.component');
const releve_saisie_component_1 = require('./components/releveSaisie/releve.saisie.component');
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forChild([
                { path: 'Releves', component: releve_home_component_1.ReleveHomeComponent },
                // {path: 'Releves/show', component: ReleveCompteurListComponent, children: [
                // {
                // 	path: ':name',
                // 	component: ReleveListComponent
                // },
                // {
                // 	path: '',
                // 	component: EmptyComponent
                // }
                // ]},
                { path: 'Releves/show', component: releve_compteur_list_component_1.ReleveCompteurListComponent },
                { path: 'Releves/show/:name', component: releve_list_component_1.ReleveListComponent },
                { path: 'Releves/make', component: releve_saisie_component_1.AddReleveComponent }
            ])
        ],
        exports: [
            router_1.RouterModule
        ]
    }), 
    __metadata('design:paramtypes', [])
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app.routes.js.map