import {
	Component, OnInit, OnDestroy, HostBinding, trigger, transition, animate, style, state, Output, EventEmitter, DoCheck
} from '@angular/core';

import { DatePipe } from '@angular/common';

import { Compteur } from "../../../model/Compteur";
import { Releve } from "../../../model/Releve";
import { CompteurService } from "../../../Services/CompteurService";
import { ReleveService } from "../../../Services/ReleveService";
import Dexie from "dexie";
import * as Rx from 'rxjs/Rx';

import { GraphConfigObjectService, coordinate } from "../graphConfigService/graph.config.service";

import { Chart, tooltipItemInterface } from "chart.js";



interface scatterDataSet {
	label: string;
	hidden?: boolean;

	tooltipUnity: () => string;

	/* Line, Radar */
	pointColor?: string;
	pointStrokeColor?: string;
	pointHighlightFill?: string;
	pointHighlightStroke?: string;

	/* Bar */
	highlightFill?: string;
	highlightStroke?: string;
	data: coordinate[];

	backgroundColor?: string;
	borderWidth?: number;
	borderColor?: string;
	borderCapStyle?: string;
	borderDash?: number[];
	borderDashOffset?: number;
	borderJoinStyle?: string;
	pointBorderColor?: string[] | string;
	pointBorderWidth?: number[] | number;
	pointRadius?: number[] | string;
	pointHoverRadius?: number[] | string;
	pointHitRadius?: number[] | string;
	pointHoverBackgroundColor?: string[] | string;
	pointHoverBorderColor?: string[] | string;
	pointHoverBorderWidth?: number[] | string;
	pointStyle?: any
}

@Component({
	moduleId: module.id,
	selector: 'graph-module',
	template:
	`
	<div class="container">
	<div class="row"> 
	<canvas id="graphique"></canvas>
	</div>
	<div class="row"> 
	<graph-config></graph-config>
	</div>
	</div>
	`
})
export class GraphComponent {

	constructor(private cptService: CompteurService, private relService: ReleveService, public config: GraphConfigObjectService, private datepipe: DatePipe) {

	}

	public compteur: Compteur;


	private originalData: Releve[];
	private originalCompteurs: Compteur[];

	private ctx: CanvasRenderingContext2D;
	private chart: Chart;



	ngOnInit() {
		(<any>Chart).defaults.global.responsive = true;
		(<any>Chart).defaults.global.animation = false;


		this.config.confUpdated.subscribe(() => {
			this.updateSeries();
		});

		var canvas = <HTMLCanvasElement>document.getElementById('graphique');
		this.ctx = canvas.getContext("2d");

		this.chart = new Chart(this.ctx, {
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
						title: (item: tooltipItemInterface[], data: any) => {
							let datasets: scatterDataSet[] = data.datasets;
							// Title doesn't make sense for scatter since we format the data as a point
							return '';
						},
						label: (item: tooltipItemInterface, data: any) => {
							let datasets: scatterDataSet[] = data.datasets;
							let unity: string = datasets[item.datasetIndex].tooltipUnity();

							return this.datepipe.transform(item.xLabel, 'shortDate') + ':  ' + item.yLabel + ' ' + unity;
						}
					}
				},
				scales: {
					xAxes: [{
						type: 'time',
						time: {
							displayFormats: {
								// 'millisecond': 'MMM DD',
								// 'second': 'MMM DD',
								// 'minute': 'MMM DD',
								// 'hour': 'MMM DD',
								// 'day': 'MMM DD',
								// 'week': 'MMM DD',
								// 'month': 'MMM DD',
								// 'quarter': 'MMM DD',
								// 'year': 'MMM DD',
							}
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
		})
	}

	private updateSeries() {
		this.chart.data.datasets.forEach((ds: scatterDataSet) => {
			var cpt = this.originalCompteurs.find(x => x.name == ds.label);
			if (cpt) {
				var datas = this.originalData.filter(x => x.idCompteur == cpt.idCompteur);

				ds.data = this.config.conversionFilter(datas, cpt);
			}
		});
		this.chart.update();
	}

	private render() {
		this.chart.data.datasets = this.convert(this.originalData, this.originalCompteurs);
		this.chart.update();
	}

	private convert(datas: Releve[], cpts: Compteur[]): scatterDataSet[] {

		let result = new Array<scatterDataSet>();
		let moneyColor = "#85BB65";
		let overallPrice: scatterDataSet = {
			label: "prix global",
			borderColor: moneyColor,
			backgroundColor: hexToRgba(moneyColor, 0.2),
			pointBorderColor: moneyColor,
			pointBorderWidth: 1,
			data: new Array<coordinate>(),
			tooltipUnity: function () {
				return '€/j';
			}
		};

		cpts.forEach((cpt) => {
			//init des infos du compteur

			let color = cpt.color;
			let currentScatterDataSet: scatterDataSet = {

				label: cpt.name,
				borderColor: color,
				backgroundColor: hexToRgba(cpt.color, 0.2),
				pointBorderColor: color,
				pointBorderWidth: 1,
				data: new Array<coordinate>(),
				tooltipUnity: () => {
					return this.config.Conso && this.config.Price ? ("€/J") : (cpt.unity.trim() + (this.config.Conso ? '/J' : ''));
				}

			};

			//définition des points de la courbe du compteur
			currentScatterDataSet.data = this.config.conversionFilter(datas.filter(x => x.idCompteur == cpt.idCompteur), cpt);
			currentScatterDataSet.data.length == 0 || result.push(currentScatterDataSet);

		});

		if (this.config.Conso && this.config.Price) {
			let overallDatas = new Array<coordinate>();
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

			overallPrice.data = overallDatas.sort((a, b) => { if (a.x > b.x) return 1; else return -1; })
		}
		overallPrice.data.length == 0 || result.push(overallPrice);

		//retour des courbes des compteus
		return result;
	}


	ngOnDestroy() {

	}

}

