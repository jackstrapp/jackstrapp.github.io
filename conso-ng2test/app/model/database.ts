import Dexie from "dexie";
import { Compteur } from "./Compteur";
import { Releve } from "./Releve";
import { Injectable } from '@angular/core';
import * as rx from "rxjs";

@Injectable()
export class DBService extends Dexie {

	public compteurs: Dexie.Table<Compteur, any>;
	// public releves: Dexie.Table<Releve, any>;
	public data: Dexie.Table<Releve, any>;
	constructor(){

		super("database");
		
		this.version(1).stores({
			compteurs: '++idCompteur, &name, comment, unity',
			data: '++idReleve, idCompteur'
			
		});
		this.open().then((value) => {
			this.compteurs.count().then((nb) => {
				if(nb == 0)
				{
					(<Dexie.Table<any, any>>this.compteurs).bulkAdd([
					{
						comment: 'le compteur d\'eau',
						// idCompteur: null,
						name: 'Compteur d\'eau',
						unity: 'm.cube'
					},
					{
						comment: 'le compteur d\'électricité',
						// idCompteur: null,
						name: 'Compteur d\'électricité',
						unity: 'KW.h'
					},
					{
						comment: 'le compteur de gaz',
						// idCompteur: null,
						name: 'Compteur de gaz',
						unity: 'm.cube'
					}
					]).then((value) =>{

					});
				}
			});
		});
	}
}