import {Injectable} from "@angular/core";
import {DBService} from "../model/database";
import {Compteur} from "../model/Compteur";
import * as Rx from 'rxjs/Rx';

@Injectable()
export class CompteurService {
	constructor(public db:DBService){

	}
	
	public getList(){
		var obs = new Rx.Subject<Compteur[]>();
		var data = new Array<Compteur>();

		this.db.compteurs.each((item) => {
			data.push(item);
		}).then(() => {
			obs.next(data);
		});
		return obs;
	}

	public get(idCompteur: number){
		var obs = new Rx.Subject<Compteur>();

		this.db.compteurs.get(idCompteur)
		.then((value) => {
			obs.next(value);
		})
		.catch((error) => {
			obs.error(error);
		})
		return obs;
	}

	public getByName(nom: string){
		var obs = new Rx.Subject<Compteur>();

		this.db.compteurs.where('name').equals(nom)
		.each((value) => {
			obs.next(value);
		})
		.catch((error) => {
			obs.error(error);
		})
		return obs;
	}

	public update(cpt: Compteur){
		var obs = new Rx.Subject<Compteur>();
		this.get(cpt.idCompteur).subscribe(() => {
			//it exists => ok
			this.db.compteurs.put(cpt)
			.then(() => {
				obs.next();
			})
			.catch((error) => {
				obs.error(error);
			});
		}, () => {
			//doesn't exists
			obs.error("le compteur id:" + cpt.idCompteur.toString() + " n'existe pas.");
			//throw "le compteur id:" + cpt.idCompteur.toString() + " n'existe pas.";

		});
		return obs;
	}
}