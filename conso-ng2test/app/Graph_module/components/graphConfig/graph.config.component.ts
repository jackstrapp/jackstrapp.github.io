import { 
	Component, OnInit, OnDestroy, HostBinding, Input, Output, EventEmitter, DoCheck, Injectable
} from '@angular/core';

import {Compteur} from "../../../model/Compteur";
import {Releve} from "../../../model/Releve";
import Dexie from "dexie";
import { Subject }    from 'rxjs/Subject';

import {GraphConfigObjectService} from '../graphConfigService/graph.config.service';


import {Chart} from "chart.js";


@Component({
	moduleId: module.id,
	selector: 'graph-config',
	template: 
	`
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
})
export class GraphConfigComponent {

	myFood = 'lamb';
	 model = 1;

	constructor(public config: GraphConfigObjectService) {

	}

	public updateChart(){

	}

	ngOnInit() {

	}

	ngOnDestroy() { 

	}

}
