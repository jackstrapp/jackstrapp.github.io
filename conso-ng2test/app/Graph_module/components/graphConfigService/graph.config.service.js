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
let GraphConfigObjectService = class GraphConfigObjectService {
    constructor() {
        this.confUpdated = new core_1.EventEmitter();
        this._Conso = true;
        this._Price = true;
    }
    get Conso() {
        return this._Conso;
    }
    set Conso(value) {
        this._Conso = value;
        this.confUpdated.emit();
    }
    get Price() {
        return this._Price;
    }
    set Price(value) {
        this._Price = value;
        this.confUpdated.emit();
    }
    conversionFilter(datas, cpt) {
        var result = [];
        //définition des points de la courbe du compteur
        datas.sort((a, b) => { if (a.date > b.date)
            return 1;
        else
            return -1; }).forEach((x, i, arr) => {
            if (this.Conso) {
                if (i) {
                    let previousData = arr[i - 1];
                    //nbDays between current read and the previous one
                    let nbDays = Math.ceil(Math.abs(previousData.date.getTime() - x.date.getTime()) / (1000 * 3600 * 24));
                    result.push({
                        x: x.date,
                        y: (x.valeur - previousData.valeur) * (this.Price ? cpt.price : 1) / nbDays,
                        comment: x.comment
                    });
                    if (i == 1) {
                        result[0].y = result[1].y;
                    }
                }
                else
                    result.push({
                        x: x.date,
                        y: 0,
                        comment: x.comment
                    });
            }
            else {
                result.push({
                    x: x.date,
                    y: x.valeur,
                    comment: x.comment
                });
            }
        });
        return result;
    }
};
GraphConfigObjectService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], GraphConfigObjectService);
exports.GraphConfigObjectService = GraphConfigObjectService;
//# sourceMappingURL=graph.config.service.js.map