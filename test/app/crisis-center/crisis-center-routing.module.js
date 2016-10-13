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
const crisis_center_home_component_1 = require('./crisis-center-home.component');
const crisis_list_component_1 = require('./crisis-list.component');
const crisis_center_component_1 = require('./crisis-center.component');
const crisis_detail_component_1 = require('./crisis-detail.component');
const crisis_detail_resolve_service_1 = require('./crisis-detail-resolve.service');
let CrisisCenterRoutingModule = class CrisisCenterRoutingModule {
};
CrisisCenterRoutingModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forChild([
                {
                    path: 'crisis-center',
                    component: crisis_center_component_1.CrisisCenterComponent,
                    children: [
                        {
                            path: '',
                            component: crisis_list_component_1.CrisisListComponent,
                            children: [
                                {
                                    path: ':id',
                                    component: crisis_detail_component_1.CrisisDetailComponent,
                                    resolve: {
                                        crisis: crisis_detail_resolve_service_1.CrisisDetailResolve
                                    }
                                },
                                {
                                    path: '',
                                    component: crisis_center_home_component_1.CrisisCenterHomeComponent
                                }
                            ]
                        }
                    ]
                }
            ])
        ],
        exports: [
            router_1.RouterModule
        ],
        providers: [
            crisis_detail_resolve_service_1.CrisisDetailResolve
        ]
    }), 
    __metadata('design:paramtypes', [])
], CrisisCenterRoutingModule);
exports.CrisisCenterRoutingModule = CrisisCenterRoutingModule;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=crisis-center-routing.module.js.map