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
const CompteurService_1 = require("../../../Services/CompteurService");
const ReleveService_1 = require("../../../Services/ReleveService");
const chart_js_1 = require("chart.js");
let GraphComponent = class GraphComponent {
    constructor(cptService, relService) {
        this.cptService = cptService;
        this.relService = relService;
    }
    convert(datas, cpts) {
        var result = new Array();
        cpts.forEach(function (cpt) {
            //init des infos du compteur
            let currentScatterDataSet = {
                label: cpt.name,
                fillColor: 'blue',
                strokeColor: 'red',
                data: new Array()
            };
            //définition des points de la courbe du compteur
            datas.filter(x => x.idCompteur == cpt.idCompteur).sort(function (a, b) {
                if (a.date > b.date)
                    return 1;
                else
                    return -1;
            }).forEach((x) => {
                currentScatterDataSet.data.push({
                    x: x.date,
                    y: x.valeur,
                    comment: x.comment
                });
            });
            if (currentScatterDataSet.data.length)
                result.push(currentScatterDataSet);
        });
        //retour des courbes des compteus
        return result;
    }
    updateChart() {
        this.chart.update();
    }
    ngOnInit() {
        chart_js_1.Chart.defaults.global.responsive = true;
        chart_js_1.Chart.defaults.global.animation = false;
        var canvas = document.getElementById('graphique');
        this.ctx = canvas.getContext("2d");
        this.chart = new chart_js_1.Chart(this.ctx, {
            type: 'line',
            data: {
                datasets: []
            },
            tooltipTemplate: "<%= value %> - commentaire: <%= comment %>",
            options: {
                scales: {
                    xAxes: [{
                            type: 'time',
                            time: {
                                displayFormats: {}
                            }
                        }]
                }
            }
        });
        this.cptService.getList().subscribe((cpts) => {
            this.relService.getList().subscribe((rels) => {
                this.chart.data.datasets = this.convert(rels, cpts);
                this.updateChart();
            });
        });
    }
    ngOnDestroy() {
    }
};
GraphComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'graph-module',
        template: `
	<div class="container">
	<div class="row"> 
	<canvas id="graphique"></canvas>
	</div>
	<div class="row"> 
	CONFIGURATIONS ET TOUT POUR LE CHART
	</div>
	</div>
	`
    }), 
    __metadata('design:paramtypes', [CompteurService_1.CompteurService, ReleveService_1.ReleveService])
], GraphComponent);
exports.GraphComponent = GraphComponent;
//# sourceMappingURL=graph.component.js.map