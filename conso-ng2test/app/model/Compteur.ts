import {Injectable} from "@angular/core";

@Injectable()
export class Compteur {
	public idCompteur: number;
	public name: string;
	public comment: string;
	public unity: string;
	//price / unity
	public price: number;
	public color: string;
}