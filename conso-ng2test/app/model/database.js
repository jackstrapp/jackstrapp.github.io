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
const dexie_1 = require("dexie");
const core_1 = require('@angular/core');
let DBService = class DBService extends dexie_1.default {
    constructor() {
        super("database");
        this.version(1).stores({
            compteurs: '++idCompteur, &name, comment, unity',
            data: '++idReleve, idCompteur'
        });
        this.open().then((value) => {
            this.compteurs.count().then((nb) => {
                if (nb == 0) {
                    this.compteurs.bulkAdd([
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
                    ]).then((value) => {
                    });
                }
            });
        });
    }
};
DBService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], DBService);
exports.DBService = DBService;
//# sourceMappingURL=database.js.map