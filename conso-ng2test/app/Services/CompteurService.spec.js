"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
let BannerComponent = class BannerComponent {
    constructor() {
        this.title = 'Test Tour of Heroes';
    }
};
BannerComponent = __decorate([
    core_1.Component({
        selector: 'app-banner',
        template: '<h1>{{title}}</h1>'
    }), 
    __metadata('design:paramtypes', [])
], BannerComponent);
exports.BannerComponent = BannerComponent;
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
//# sourceMappingURL=CompteurService.spec.js.map