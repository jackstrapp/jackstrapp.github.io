
import { TestBed, ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser';
import { DebugElement, Component } from '@angular/core';
import { CompteurDetailComponent } from '../compteur_module/components/CompteurDetail/compteur.detail.component'

import { DBService } from '../model/database';
import { CompteurService } from './CompteurService';



@Component({
  selector: 'app-banner',
  template: '<h1>{{title}}</h1>'
})
export class BannerComponent {
  title = 'Test Tour of Heroes';
}




// describe('1st tests', () => {
//   let fixture: ComponentFixture<BannerComponent>, comp: BannerComponent;

//   beforeEach(() => {

//     // refine the test module by declaring the test component
//     TestBed.configureTestingModule({
//       declarations: [BannerComponent],
//       providers: [
//         {
//           provide: DBService, useValue: {
//             compteurs: {}
//           }
//         },
//         CompteurService
//       ]
//     });

//     // create component and test fixture
//     fixture = TestBed.createComponent(BannerComponent);

//     // get test component from the fixture
//     comp = fixture.componentInstance;
//   });

//   it('should display original title', () => {
//     // trigger change detection to update the view
//     fixture.detectChanges();

//     // query for the title <h1> by CSS element selector
//     let de = fixture.debugElement.query(By.css('h1'));

//     // confirm the element's content
//     expect(de.nativeElement.textContent).toContain(comp.title);
//     var s = TestBed.get(DBService);
//     expect(s.compteurs).toEqual({});
//     expect(s).toEqual({});
//     expect(s.datas).toBeDefined();
//   });


//   it('true is true', () => expect(true).toBe(true));

// });