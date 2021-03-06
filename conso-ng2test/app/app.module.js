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
const common_1 = require('@angular/common');
const ng_bootstrap_1 = require('@ng-bootstrap/ng-bootstrap');
const app_component_1 = require('./app.component');
const app_routes_1 = require('./app.routes');
const main_menu_component_1 = require('./main/main.menu.component');
const database_1 = require('./model/database');
const CompteurService_1 = require('./Services/CompteurService');
const ReleveService_1 = require('./Services/ReleveService');
const graph_config_service_1 = require('./Graph_module/components/graphConfigService/graph.config.service');
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, app_routes_1.AppRoutingModule, ng_bootstrap_1.NgbModule.forRoot()],
        declarations: [app_component_1.AppComponent, main_menu_component_1.MainMenuComponent],
        providers: [{ provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }, database_1.DBService, CompteurService_1.CompteurService, ReleveService_1.ReleveService, graph_config_service_1.GraphConfigObjectService, common_1.DatePipe],
        bootstrap: [app_component_1.AppComponent]
    }), 
    __metadata('design:paramtypes', [])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map