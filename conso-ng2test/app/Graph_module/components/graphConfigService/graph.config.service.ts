import {
	Injectable, EventEmitter
} from '@angular/core';

import { Compteur } from "../../../model/Compteur";
import { Releve } from "../../../model/Releve";

export interface coordinate {
	x: any;
	y: any;
	comment?: string;
	//used when y is converted as a price
	originalValue?: any;
}

@Injectable()
export class GraphConfigObjectService {

	confUpdated: EventEmitter<void> = new EventEmitter<void>();

	private _Conso = true;

	get Conso(): boolean {
		return this._Conso;
	}
	set Conso(value: boolean) {
		this._Conso = value;
		this.confUpdated.emit();
	}

	private _Price = true;

	get Price(): boolean {
		return this._Price;
	}
	set Price(value: boolean) {
		this._Price = value;
		this.confUpdated.emit();
	}

	conversionFilter(datas: Releve[], cpt: Compteur) {
		var result: coordinate[] = [];
		//définition des points de la courbe du compteur
		datas.sort((a, b) => { if (a.date > b.date) return 1; else return -1; }).forEach((x, i, arr) => {

			if (this.Conso) {
				if (i) {
					let previousData = arr[i - 1];
					//nbDays between current read and the previous one
					let nbDays = Math.ceil(Math.abs(previousData.date.getTime() - x.date.getTime()) / (1000 * 3600 * 24));

					result.push({
						x: x.date,
						y: (x.valeur - previousData.valeur) * (this.Price ? cpt.price : 1) / nbDays,
						comment: x.comment
					});
					if (i == 1) {
						result[0].y = result[1].y
					}
				}
				else
					result.push({
						x: x.date,
						y: 0,
						comment: x.comment
					});
			}
			else {
				result.push({
					x: x.date,
					y: x.valeur,
					comment: x.comment
				});
			}
		});

		return result;

	}
}