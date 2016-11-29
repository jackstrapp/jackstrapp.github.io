import {Injectable} from "@angular/core";
import {DBService} from "../model/database";
import {Releve} from "../model/Releve";
import * as Rx from 'rxjs/Rx';

@Injectable()
export class ReleveService {
	constructor(public db: DBService){
	}

	public getByCompteur(idCompteur: number){
		var obs = new Rx.Subject<Releve[]>();
		var data = new Array<Releve>();

		this.db.data
		.where('idCompteur').equals(idCompteur)
		.each((item) => {
			data.push(item);
		}).then(() => {
			obs.next(data);
		});
		return obs;
	}

	public getList(){
		var obs = new Rx.Subject<Releve[]>();
		var data = new Array<Releve>();

		this.db.data.each((item) => {
			data.push(item);
		}).then(() => {
			obs.next(data);
		});
		return obs;
	}

	public get(idReleve: number){
		var obs = new Rx.Subject<Releve>();

		this.db.data.get(idReleve)
		.then((value) => {
			obs.next(value);
		})
		.catch((error) => {
			obs.error(error);
		})
		return obs;
	}

	public add(rel: Releve){
		var obs = new Rx.Subject<Releve>();
		delete rel.idReleve;
		//it exists => ok
		this.db.data.add(rel)
		.then(() => {
			obs.next();
		})
		.catch((error) => {
			obs.error(error);
		});

		return obs;
	}

	public update(rel: Releve){
		var obs = new Rx.Subject<Releve>();
		this.get(rel.idReleve).subscribe(() => {
			//it exists => ok
			this.db.data.put(rel)
			.then(() => {
				obs.next();
			})
			.catch((error) => {
				obs.error(error);
			});
		}, () => {
			//doesn't exists
			obs.error("le relevé id:" + rel.idReleve.toString() + " n'existe pas.");
			//throw "le compteur id:" + cpt.idCompteur.toString() + " n'existe pas.";

		});
		return obs;
	}

	public delete(rel: Releve){
		var obs = new Rx.Subject<Releve>();
		this.get(rel.idReleve).subscribe(() => {
			//it exists => ok
			this.db.data.delete(rel.idReleve)
			.then(() => {
				obs.next();
			})
			.catch((error) => {
				obs.error(error);
			});
		}, () => {
			//doesn't exists
			obs.error("le relevé id:" + rel.idReleve.toString() + " n'existe pas.");
			//throw "le compteur id:" + cpt.idCompteur.toString() + " n'existe pas.";

		});
		return obs;
	}

}