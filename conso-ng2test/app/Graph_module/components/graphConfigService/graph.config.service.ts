import { 
	Injectable, EventEmitter
} from '@angular/core';


@Injectable()
export class GraphConfigObjectService {

	confUpdated:EventEmitter<void> = new EventEmitter<void>();

	private _Conso = true;

	get Conso():boolean {
		return this._Conso;
	}
	set Conso(value:boolean) {
		this._Conso = value;
		this.confUpdated.emit();
	}

	private _Price = true;

	get Price():boolean {
			return this._Price;
	}
	set Price(value:boolean) {
		this._Price = value;
		this.confUpdated.emit();
	}

}