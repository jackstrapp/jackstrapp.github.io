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
const common_1 = require('@angular/common');
const CompteurService_1 = require("../../../Services/CompteurService");
const ReleveService_1 = require("../../../Services/ReleveService");
const graph_config_service_1 = require("../graphConfigService/graph.config.service");
const chart_js_1 = require("chart.js");
let GraphComponent = class GraphComponent {
    constructor(cptService, relService, config, datepipe) {
        this.cptService = cptService;
        this.relService = relService;
        this.config = config;
        this.datepipe = datepipe;
    }
    ngOnInit() {
        chart_js_1.Chart.defaults.global.responsive = true;
        chart_js_1.Chart.defaults.global.animation = false;
        this.config.confUpdated.subscribe(() => {
            this.updateSeries();
        });
        var canvas = document.getElementById('graphique');
        this.ctx = canvas.getContext("2d");
        this.chart = new chart_js_1.Chart(this.ctx, {
            type: 'line',
            data: {
                datasets: []
            },
            tooltipTemplate: "<%= value %> - commentaire: <%= comment %>",
            options: {
                // // String - Template string for single tooltips
                //    tooltipTemplate: "<%if (label){%><%=label %>: <%}%><%= value + ' %' %>",
                //    // String - Template string for multiple tooltips
                //    multiTooltipTemplate: "<%= value + ' %' %>",
                tooltips: {
                    callbacks: {
                        title: (item, data) => {
                            let datasets = data.datasets;
                            // Title doesn't make sense for scatter since we format the data as a point
                            return '';
                        },
                        label: (item, data) => {
                            let datasets = data.datasets;
                            let unity = datasets[item.datasetIndex].tooltipUnity;
                            return this.datepipe.transform(item.xLabel, 'shortDate') + ':  ' + item.yLabel + ' ' + unity;
                        }
                    }
                },
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
                this.originalCompteurs = cpts;
                this.originalData = rels;
                this.render();
            });
        });
    }
    updateSeries() {
        this.chart.data.datasets.forEach((ds) => {
            var cpt = this.originalCompteurs.find(x => x.name == ds.label);
            if (cpt) {
                var datas = this.originalData.filter(x => x.idCompteur == cpt.idCompteur);
                ds.data = this.config.conversionFilter(datas, cpt);
            }
        });
        this.chart.update();
    }
    render() {
        this.chart.data.datasets = this.convert(this.originalData, this.originalCompteurs);
        this.chart.update();
    }
    convert(datas, cpts) {
        let result = new Array();
        let moneyColor = "#85BB65";
        let overallPrice = {
            label: "prix global",
            borderColor: moneyColor,
            backgroundColor: hexToRgba(moneyColor, 0.2),
            pointBorderColor: moneyColor,
            pointBorderWidth: 1,
            data: new Array(),
            tooltipUnity: '€/j'
        };
        cpts.forEach((cpt) => {
            //init des infos du compteur
            let color = cpt.color;
            let currentScatterDataSet = {
                label: cpt.name,
                borderColor: color,
                backgroundColor: hexToRgba(cpt.color, 0.2),
                pointBorderColor: color,
                pointBorderWidth: 1,
                data: new Array(),
                tooltipUnity: this.config.Conso && this.config.Price ? ("€/J") : (cpt.unity.trim() + (this.config.Conso ? '/J' : ''))
            };
            //définition des points de la courbe du compteur
            currentScatterDataSet.data = this.config.conversionFilter(datas.filter(x => x.idCompteur == cpt.idCompteur), cpt);
            currentScatterDataSet.data.length == 0 || result.push(currentScatterDataSet);
        });
        if (this.config.Conso && this.config.Price) {
            let overallDatas = new Array();
            result.forEach((item, index, arr) => {
                item.data.map((item, index, arr) => {
                    var existing = overallDatas.find(x => +x.x == +item.x);
                    if (existing)
                        existing.y += item.y;
                    else
                        overallDatas.push({
                            x: item.x,
                            y: item.y
                        });
                });
            });
            overallPrice.data = overallDatas.sort((a, b) => { if (a.x > b.x)
                return 1;
            else
                return -1; });
        }
        overallPrice.data.length == 0 || result.push(overallPrice);
        //retour des courbes des compteus
        return result;
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
	<graph-config></graph-config>
	</div>
	</div>
	`
    }), 
    __metadata('design:paramtypes', [CompteurService_1.CompteurService, ReleveService_1.ReleveService, graph_config_service_1.GraphConfigObjectService, common_1.DatePipe])
], GraphComponent);
exports.GraphComponent = GraphComponent;
//# sourceMappingURL=graph.component.js.map