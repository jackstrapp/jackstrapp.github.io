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
let ReleveService = class ReleveService {
    constructor(db) {
        this.db = db;
        var x = 'toto';
    }
    getByCompteur(idCompteur) {
        var obs = new Rx.Subject();
        var data = new Array();
        this.db.data
            .where('idCompteur').equals(idCompteur)
            .each((item) => {
            data.push(item);
        }).then(() => {
            obs.next(data);
        });
        return obs;
    }
    getList() {
        var obs = new Rx.Subject();
        var data = new Array();
        this.db.data.each((item) => {
            data.push(item);
        }).then(() => {
            obs.next(data);
        });
        return obs;
    }
    get(idReleve) {
        var obs = new Rx.Subject();
        this.db.data.get(idReleve)
            .then((value) => {
            obs.next(value);
        })
            .catch((error) => {
            obs.error(error);
        });
        return obs;
    }
    add(rel) {
        var obs = new Rx.Subject();
        delete rel.idReleve;
        //it exists => ok
        this.db.data.add(rel)
            .then(() => {
            obs.next();
        })
            .catch((error) => {
            obs.error(error);
        });
        return obs;
    }
    update(rel) {
        var obs = new Rx.Subject();
        this.get(rel.idReleve).subscribe(() => {
            //it exists => ok
            this.db.data.put(rel)
                .then(() => {
                obs.next();
            })
                .catch((error) => {
                obs.error(error);
            });
        }, () => {
            //doesn't exists
            obs.error("le relevé id:" + rel.idReleve.toString() + " n'existe pas.");
            //throw "le compteur id:" + cpt.idCompteur.toString() + " n'existe pas.";
        });
        return obs;
    }
    delete(rel) {
        var obs = new Rx.Subject();
        this.get(rel.idReleve).subscribe(() => {
            //it exists => ok
            this.db.data.delete(rel.idReleve)
                .then(() => {
                obs.next();
            })
                .catch((error) => {
                obs.error(error);
            });
        }, () => {
            //doesn't exists
            obs.error("le relevé id:" + rel.idReleve.toString() + " n'existe pas.");
            //throw "le compteur id:" + cpt.idCompteur.toString() + " n'existe pas.";
        });
        return obs;
    }
};
ReleveService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [database_1.DBService])
], ReleveService);
exports.ReleveService = ReleveService;
//# sourceMappingURL=ReleveService.js.map