import { Injectable } from '@angular/core';
import { Hero }     from './app.model';
import { Http, Response } from '@angular/http';

@Injectable()
export class HeroService {
  constructor(private http: Http){}
  
  private heroes: Hero[] = null
  
  
  getHeroes(): Observable<Hero[]> {
    if(this.heroes == null){
     
     return this.http.get('./app/heroes.json');
    }
    else
      return this.heroes;
  }
  addHero(hero: Hero){
        var currentHero = this.heroes.filter(x => x.id == hero.id)[0];
        
        if(currentHero)
          throw "Hero with id "+ hero.id + " already exists";
          
        this.heroes.push(Object.assign({}, hero));
  }
  updateHero(hero: Hero){
      if(!hero.id > 0)
        throw "can't update hero with id: "+hero.id;
        
        var currentHero = this.heroes.filter(x => x.id == hero.id)[0];
        
        if(!currentHero)
          throw "Hero with id "+ hero.id + " not found";
          
        currentHero.name = hero.name;
        currentHero.isSecret = hero.isSecret;
  }
  deleteHero(id: number){
    this.heroes.forEach(function(item, index, arr){
      if(item.id == id)
        arr.splice(index, 1);
    });
  }
}
