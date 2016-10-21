import { 
	Component, OnInit, OnDestroy, HostBinding, trigger, transition, animate, style, state, Output, EventEmitter, DoCheck
} from '@angular/core';

import {DatePipe} from '@angular/common';

import {Compteur} from "../../../model/Compteur";
import {Releve} from "../../../model/Releve";
import {CompteurService} from "../../../Services/CompteurService";
import {ReleveService} from "../../../Services/ReleveService";
import Dexie from "dexie";
import * as Rx from 'rxjs/Rx';	

import {GraphConfigObjectService} from "../graphConfigService/graph.config.service";

import {Chart, tooltipItemInterface} from "chart.js";

interface coordinate{
	x: any;
	y: any;
	comment?: string;
	//used when y is converted as a price
	originalValue?: any;
}

interface scatterDataSet{
	label: string;

	tooltipUnity: string;

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


		this.config.confUpdated.subscribe(() => { this.render(); });

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
							let unity: string = datasets[item.datasetIndex].tooltipUnity;

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

	private render(){
		this.chart.data.datasets = this.convert(this.originalData, this.originalCompteurs);
		this.updateChart();
	}

	private convert(datas: Releve[], cpts: Compteur[]): scatterDataSet[]{
		var result = new Array<scatterDataSet>();

		let overallPrice: scatterDataSet = {
			label: "prix global",
			fillColor: 'rgb(255, 0, 0)',
			strokeColor: '',
			data: new Array<coordinate>(),
			tooltipUnity: '€/j'
		};

		cpts.forEach((cpt) => {
				//init des infos du compteur

				var color = cpt.color
				let currentScatterDataSet: scatterDataSet = {

					label: cpt.name,
					borderColor: color,
					backgroundColor: hexToRgba(cpt.color, 0.2),
					pointBorderColor: color,
					pointBorderWidth: 1,
					data: new Array<coordinate>(),
					tooltipUnity: this.config.Conso && this.config.Price ? ("€/J") : (cpt.unity.trim() + (this.config.Conso ? '/J' : ''))

				};

				//définition des points de la courbe du compteur
				datas.filter(x => x.idCompteur == cpt.idCompteur).sort((a, b) => {if(a.date > b.date) return 1; else return -1;}).forEach((x, i, arr) => {

					if(this.config.Conso){
						if(i)
						{
							let previousData = arr[i-1];
							//nbDays between current read and the previous one
							let nbDays = Math.ceil(Math.abs(previousData.date.getTime() - x.date.getTime()) / (1000 * 3600 * 24)); 

							currentScatterDataSet.data.push({
								x: x.date,
								y: (x.valeur - previousData.valeur) * (this.config.Price ? cpt.price : 1) / nbDays,
								comment: x.comment
							});
						}
						else
							currentScatterDataSet.data.push({
								x: x.date,
								y: 0,
								comment: x.comment
							});
						
						// let existing = overallPrice.data.filter(w => w.x == x.date)[0];
						// if(existing)
						// 	existing.y += x.valeur * cpt.price;
						// else
						// 	overallPrice.data.push({
						// 		x: x.date,
						// 		y: x.valeur * cpt.price
						// 	});
					}
					else{
						currentScatterDataSet.data.push({
							x: x.date,
							y: x.valeur,
							comment: x.comment
						});
					}
				});
				if ( currentScatterDataSet.data.length )
					result.push(currentScatterDataSet);
			});
		if(overallPrice.data.length)
			result.push(overallPrice);
		
		//retour des courbes des compteus
		return result;
	}

	public updateChart() {
		this.chart.update();
	}	

	ngOnDestroy() { 

	}

}

