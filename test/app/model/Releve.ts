import {Injectable} from "@angular/core";

@Injectable()
export class Releve {
	public idReleve: number;
	public idCompteur: number;
	public date: Date;
	public valeur: number;
	public comment: string;
}