import { Injectable } from '@angular/core';
import { Hero } from './app.model';

@Injectable()
export class DBService extends Dexie {
  

  constructor(){
    
    super('mainDB');
  	// Define a schema
  	this.version(1).stores({
  		heroes: '++id, name, isSecret'
  	});
  	
  	// Open the database
  	this.open().catch(function(error) {
  		alert('Dexie database \'mainDB\' initialisation error : ' + error);
  	});
  	
  }
  
}
