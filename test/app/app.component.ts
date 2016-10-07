import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Hero } from './app.model';
import { HeroService } from './app.heroes.service';
import { DBService } from './app.database.service';

@Component({
  selector: 'hero-master',
  providers: [HeroService, DBService],
  templateUrl: './app/template/hero.master.html',
  directives: [HeroDetailComponent]
})
export class HeroMasterComponent { 
  heroes: Promise<Array<Hero>>;
  selectedHero: Hero = null;
  selectHero(hero: Hero){
    this.selectedHero = hero;
  }
  Update(){
    this.toUpdateHero = Object.assign({}, this.selectedHero);
  }
  Add(){
    var newHero = new Hero();
    newHero.name = 'nouveau Héro';
    this.heroesService.addHero(newHero).then(() => {
      this.loadData();
      this.selectHero(newHero);
      this.Update();
    });
  }
  Delete(){
    this.heroesService.deleteHero(this.selectedHero.id).then(() => {
      this.selectedHero = null;
      this.loadData();
    });
  }
  
  
  myValueChange(event) {
    
    this.heroesService.updateHero(event).then(() => {
      this.loadData();
    })
  }
  
  
  loadData(){
    
    this.heroes = this.heroesService.getHeroes();
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
  <button type="submit" class="btn btn-default">Submit</button>
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
