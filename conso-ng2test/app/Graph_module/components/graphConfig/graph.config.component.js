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
const graph_config_service_1 = require('../graphConfigService/graph.config.service');
let GraphConfigComponent = class GraphConfigComponent {
    constructor(config) {
        this.config = config;
        this.myFood = 'lamb';
        this.model = 1;
    }
    updateChart() {
    }
    ngOnInit() {
    }
    ngOnDestroy() {
    }
};
GraphConfigComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'graph-config',
        template: `
	<form>
		<div class="row">
			<div class="btn-group">
				<label class="btn btn-primary" [ngClass]="{'active': config.Conso == false}" >
					<input type="radio" [value]="false" name="conso" [(ngModel)]="config.Conso"> releve
				</label>
				<label class="btn btn-primary" [ngClass]="{'active': config.Conso == true}">
					<input type="radio" [value]="true" name="conso" [(ngModel)]="config.Conso"> conso
				</label>
			</div>
		</div>
		<div class="row">
			<div class="btn-group">
				<label class="btn btn-primary" [ngClass]="{'active': config.Price == false, disabled: !config.Conso}" >
					<input type="radio" [value]="false" name="prix" [(ngModel)]="config.Price" [disabled]="!config.Conso"> releve
				</label>
				<label class="btn btn-primary" [ngClass]="{'active': config.Price == true, disabled: !config.Conso}" >
					<input type="radio" [value]="true" name="prix" [(ngModel)]="config.Price" [disabled]="!config.Conso"> prix
				</label>
			</div>
		</div>
	</form>
	`,
        styles: [
            'input[type=radio] {position: absolute; clip: rect(0,0,0,0); pointer-events: none;}'
        ]
    }), 
    __metadata('design:paramtypes', [graph_config_service_1.GraphConfigObjectService])
], GraphConfigComponent);
exports.GraphConfigComponent = GraphConfigComponent;
//# sourceMappingURL=graph.config.component.js.map