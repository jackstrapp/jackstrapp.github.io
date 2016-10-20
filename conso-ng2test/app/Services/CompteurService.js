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
const core_1 = require("@angular/core");
const database_1 = require("../model/database");
const Rx = require('rxjs/Rx');
let CompteurService = class CompteurService {
    constructor(db) {
        this.db = db;
    }
    getList() {
        var obs = new Rx.Subject();
        var data = new Array();
        this.db.compteurs.each((item) => {
            data.push(item);
        }).then(() => {
            obs.next(data);
        });
        return obs;
    }
    get(idCompteur) {
        var obs = new Rx.Subject();
        var item = null;
        this.db.compteurs.get(idCompteur)
            .then((value) => {
            item = value;
        })
            .catch((error) => {
            obs.error(error);
        })
            .finally(() => {
            obs.next(item);
        });
        return obs;
    }
    getByName(nom) {
        var obs = new Rx.Subject();
        var inter = null;
        this.db.compteurs.where('name').equals(nom)
            .each((value) => {
            inter = value;
        })
            .catch((error) => {
            obs.error(error);
        })
            .finally(() => {
            obs.next(inter);
        });
        return obs;
    }
    update(cpt) {
        var obs = new Rx.Subject();
        this.get(cpt.idCompteur).subscribe(() => {
            //it exists => ok
            this.db.compteurs.put(cpt)
                .then(() => {
                obs.next();
            })
                .catch((error) => {
                obs.error(error);
            });
        }, () => {
            //doesn't exists
            obs.error("le compteur id:" + cpt.idCompteur.toString() + " n'existe pas.");
            //throw "le compteur id:" + cpt.idCompteur.toString() + " n'existe pas.";
        });
        return obs;
    }
};
CompteurService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [database_1.DBService])
], CompteurService);
exports.CompteurService = CompteurService;
//# sourceMappingURL=CompteurService.js.map