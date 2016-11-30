
import { TestBed, ComponentFixture, async } from '@angular/core/testing'
import { By } from '@angular/platform-browser';
import { DebugElement, Component, Injectable } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as Rx from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { DBService } from '../../../model/database';
import { Compteur } from '../../../model/Compteur';
import { CompteurService } from '../../../Services/CompteurService';
import { CompteurListComponent } from './compteur.liste.component';

@Injectable()
class MockedCompteurService {

    cpt1: Compteur = {
        idCompteur: 1,
        color: '###',
        comment: 'comment 1',
        name: 'cpt1',
        price: 0.256,
        unity: 'unit1'
    };

    cpt2: Compteur = {
        idCompteur: 2,
        color: 'color2',
        comment: 'comment 2',
        name: 'cpt2',
        price: 1.25,
        unity: 'unit2'
    };

    cpt3: Compteur = {
        idCompteur: 3,
        color: 'fushia',
        comment: 'comment 3',
        name: 'cpt three',
        price: 0.0041,
        unity: 'degrees'
    };

    mockedData: Compteur[] = [
        this.cpt1,
        this.cpt2,
        this.cpt3

    ];

    constructor() {

    }

    public getList() {
        var obs = new Rx.Subject<Compteur[]>();
        var data = new Array<Compteur>();
        setTimeout(() => {
            this.mockedData.forEach((item, index, arr) => {
                data.push(item);
            });
            obs.next(data);
        }, 0);

        return obs;
    }
}


describe('CompteurListe Component: ', () => {
    let fixture: ComponentFixture<CompteurListComponent>, comp: CompteurListComponent;

    beforeEach(async(() => {

        // refine the test module by declaring the test component
        TestBed.configureTestingModule({
            declarations: [CompteurListComponent],
            providers: [
                {
                    provide: CompteurService, useValue: new MockedCompteurService()
                },
                DBService,
                {
                    provide: ActivatedRoute, useValue: { params: [{ id: 2 }] }
                },
                {
                    provide: Router, useValue: { navigate: function () { console.log('Router.navigate called !') } }
                }

            ]
        });

        // create component and test fixture
        fixture = TestBed.createComponent(CompteurListComponent);

        // get test component from the fixture
        comp = fixture.componentInstance;

        // trigger change detection to update the view   
        fixture.detectChanges();
        fixture.whenStable().then(() => { //wait for getList() async call to finish
            fixture.detectChanges();
        });
    }));

    it('should display three counter', () => {
        // query for the <tr> in the <table> element.
        let de = fixture.debugElement.queryAll(By.css('tbody > tr'));

        // confirm the element's content => should be 3 <tr> (for three counter)
        expect(de.length).toBe(3);
        // table rows should have de 'selected' only if ths counter id matches the route param (configured in the beforeEAch statement)
        expect(de[0].classes["selected"]).not.toBeTruthy();
        expect(de[1].classes["selected"]).toBeTruthy();
        expect(de[2].classes["selected"]).not.toBeTruthy();
    });

    it('should change route when click on button in row', () => {
        let routerService = fixture.debugElement.injector.get(Router);
        let spy = spyOn(routerService, 'navigate').and.callThrough();

        let de = fixture.debugElement.queryAll(By.css('tbody > tr'));

        //triggering click on second row
        de[1].query(By.css('button')).triggerEventHandler('click', null);
        fixture.detectChanges();

        expect(spy).toHaveBeenCalled();

    });


    afterAll(() => {
        fixture.destroy();
    });
});