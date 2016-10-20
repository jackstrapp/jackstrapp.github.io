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
let MainMenuComponent = class MainMenuComponent {
    constructor() {
    }
};
MainMenuComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        template: `
	<div class="container-fluid">
		<div class="row">
			<div class="fill-height col-sm-6 col-md-6 col-lg-6 col-xl-6"> 
				<a class="btn btn-primary" style="width: 100%; margin-top: 10px;" routerLink="/Releves/make" routerLinkActive="active"> 
					<i class="fa fa-pencil fa-6" aria-hidden="true"></i>
				</a>
			</div>
			<div class="fill-height col-sm-6 col-md-6 col-lg-6 col-xl-6"> 
				<a class="btn btn-primary" style="width: 100%; margin-top: 10px;" routerLink="/Charts" routerLinkActive="active"> 
					<i class="fa fa-area-chart fa-6" aria-hidden="true"></i> 
				</a> 
			</div>
		</div>
	</div>	
	`,
        styles: ['i.fa { font-size: 8em;}']
    }), 
    __metadata('design:paramtypes', [])
], MainMenuComponent);
exports.MainMenuComponent = MainMenuComponent;
//# sourceMappingURL=main.menu.component.js.map