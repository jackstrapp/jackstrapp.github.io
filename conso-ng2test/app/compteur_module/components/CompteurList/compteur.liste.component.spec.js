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
const testing_1 = require('@angular/core/testing');
const platform_browser_1 = require('@angular/platform-browser');
const core_1 = require('@angular/core');
const router_1 = require('@angular/router');
const Rx = require('rxjs/Rx');
const database_1 = require('../../../model/database');
const CompteurService_1 = require('../../../Services/CompteurService');
const compteur_liste_component_1 = require('./compteur.liste.component');
let MockedCompteurService = class MockedCompteurService {
    constructor() {
        this.cpt1 = {
            idCompteur: 1,
            color: '###',
            comment: 'comment 1',
            name: 'cpt1',
            price: 0.256,
            unity: 'unit1'
        };
        this.cpt2 = {
            idCompteur: 2,
            color: 'color2',
            comment: 'comment 2',
            name: 'cpt2',
            price: 1.25,
            unity: 'unit2'
        };
        this.cpt3 = {
            idCompteur: 3,
            color: 'fushia',
            comment: 'comment 3',
            name: 'cpt three',
            price: 0.0041,
            unity: 'degrees'
        };
        this.mockedData = [
            this.cpt1,
            this.cpt2,
            this.cpt3
        ];
    }
    getList() {
        var obs = new Rx.Subject();
        var data = new Array();
        setTimeout(() => {
            this.mockedData.forEach((item, index, arr) => {
                data.push(item);
            });
            obs.next(data);
        }, 0);
        return obs;
    }
};
MockedCompteurService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], MockedCompteurService);
describe('CompteurListe Component: ', () => {
    let fixture, comp;
    beforeEach(testing_1.async(() => {
        // refine the test module by declaring the test component
        testing_1.TestBed.configureTestingModule({
            declarations: [compteur_liste_component_1.CompteurListComponent],
            providers: [
                {
                    provide: CompteurService_1.CompteurService, useValue: new MockedCompteurService()
                },
                database_1.DBService,
                {
                    provide: router_1.ActivatedRoute, useValue: { params: [{ id: 2 }] }
                },
                {
                    provide: router_1.Router, useValue: { navigate: function () { console.log('Router.navigate called !'); } }
                }
            ]
        });
        // create component and test fixture
        fixture = testing_1.TestBed.createComponent(compteur_liste_component_1.CompteurListComponent);
        // get test component from the fixture
        comp = fixture.componentInstance;
        // trigger change detection to update the view   
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
        });
    }));
    it('should display three counter', () => {
        // query for the <tr> in the <table> element.
        let de = fixture.debugElement.queryAll(platform_browser_1.By.css('tbody > tr'));
        // confirm the element's content => should be 3 <tr> (for three counter)
        expect(de.length).toBe(3);
        // table rows should have de 'selected' only if ths counter id matches the route param (configured in the beforeEAch statement)
        expect(de[0].classes["selected"]).not.toBeTruthy();
        expect(de[1].classes["selected"]).toBeTruthy();
        expect(de[2].classes["selected"]).not.toBeTruthy();
    });
    it('should change route when click on button in row', () => {
        let routerService = fixture.debugElement.injector.get(router_1.Router);
        let spy = spyOn(routerService, 'navigate').and.callThrough();
        let de = fixture.debugElement.queryAll(platform_browser_1.By.css('tbody > tr'));
        //triggering click on second row
        de[1].query(platform_browser_1.By.css('button')).triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(spy).toHaveBeenCalled();
    });
    afterAll(() => {
        fixture.destroy();
    });
});
//# sourceMappingURL=compteur.liste.component.spec.js.map