import { Injectable, Inject } from '@angular/core';
import { Hero }     from './app.model';
import { DBService } from './app.database.service';

@Injectable()
export class HeroService {
  public db = null;
  
  constructor(db: DBService){
    this.db = db;
  }
  
  private heroes: Hero[] = null
  
  
  getHeroes(): Observable<Hero[]> {
    var self = this;
    return new Promise((resolve, reject) => {
      self.db.heroes.toArray(function (heroes) {
    			resolve(heroes);
    		});
      
    });
  }
  
  addHero(hero: Hero): Promise<any>{
     return this.db.heroes.add(hero);
  }
  
  updateHero(hero: Hero): Promise<any>{
    	return this.db.heroes.put(hero);
  }
  
  deleteHero(id: number): Promise<any>{
   	return this.db.heroes.delete(id);
  }
}
