import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Hero } from './app.model';
import { HeroService } from './app.heroes.service';

@Component({
  selector: 'hero-master',
  providers: [HeroService],
  templateUrl: './app/template/hero.master.html',
  directives: [HeroDetailComponent]
})
export class HeroMasterComponent { 
  heroes = new Array<Hero>();
  selectedHero: Hero = null;
  selectHero(hero: Hero){
    this.selectedHero = hero;
  }
  Update(){
    this.toUpdateHero = Object.assign({}, this.selectedHero);
  }
  Add(){
    var newHero = new Hero();
    var maxId =  Math.max.apply( null, this.heroes.map(function ( item ) { return item.id; }));
    
    newHero.id = maxId + 1;
    newHero.name = 'nouveau Héro';
    this.heroesService.addHero(newHero);
    this.selectHero(newHero);
    this.Update();
  }
  Delete(){
    this.heroesService.deleteHero(this.selectedHero.id);
  }
  
  
  myValueChange(event) {
    this.heroesService.updateHero(event);
  }
  
  
  loadData(){
    var self = this;
    this.heroesService.getHeroes().subscribe( function(result){
      self.heroes = result.json();
    });
  }
  
  constructor(public heroesService: HeroService){
    this.loadData();
  }
}

@Component({
  selector: 'hero-detail',
  template: `
<form *ngIf="hero" (ngSubmit)="validate()" >
   <div class="form-group">
    <label>id</label>
    <input name="id" class="form-control" [ngModel]="hero.id" readonly placeholder="id">
  </div>
   <div class="form-group">
    <label>name</label>
    <input name="name" required class="form-control" [(ngModel)]="hero.name" placeholder="name">
  </div>
  <button type="submit" class="btn btn-success">Submit</button>
</form>`

})
export class HeroDetailComponent {
    @Input() hero: Hero;
    @Output('on-terminated') ee = new EventEmitter();
    
    
    
    validate(){
      this.ee.emit(this.hero);
      this.hero = new Object();
      this.hero = null;
    }
}
