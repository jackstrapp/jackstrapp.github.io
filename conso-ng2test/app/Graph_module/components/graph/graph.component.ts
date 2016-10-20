import { 
	Component, OnInit, OnDestroy, HostBinding, trigger, transition, animate, style, state, Output, EventEmitter 
} from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import {Compteur} from "../../../model/Compteur";
import {Releve} from "../../../model/Releve";
import {CompteurService} from "../../../Services/CompteurService";
import {ReleveService} from "../../../Services/ReleveService";
import {DBService} from "../../../model/database";
import Dexie from "dexie";
import * as Rx from 'rxjs/Rx';	

import {Chart} from "chart.js";

interface coordinate{
	x: any;
	y: any;
	comment?: string;
}

interface scatterDataSet{
	label: string;
	fillColor: string;
	strokeColor: string;

	/* Line, Radar */
	pointColor?: string;
	pointStrokeColor?: string;
	pointHighlightFill?: string;
	pointHighlightStroke?: string;

	/* Bar */
	highlightFill?: string;
	highlightStroke?: string;
	data: coordinate[];
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
	CONFIGURATIONS ET TOUT POUR LE CHART
	</div>
	</div>
	`
})
export class GraphComponent {
	public compteur: Compteur;
	constructor(private cptService: CompteurService, private relService: ReleveService) {

	}

	private convert(datas: Releve[], cpts: Compteur[]): scatterDataSet[]{
		var result = new Array<scatterDataSet>();
		cpts.forEach(function(cpt){
				//init des infos du compteur
				let currentScatterDataSet: scatterDataSet = {
					label: cpt.name,
					fillColor: 'blue',
					strokeColor: 'red',
					data: new Array<coordinate>()
				}

				//définition des points de la courbe du compteur
				datas.filter(x => x.idCompteur == cpt.idCompteur).sort(function(a, b){
					if(a.date > b.date)
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
				if ( currentScatterDataSet.data.length )
					result.push(currentScatterDataSet);
			});

			//retour des courbes des compteus
			return result;
		}

		private ctx: CanvasRenderingContext2D;
		private chart: Chart;

		public updateChart(){
			this.chart.update();
		}

		ngOnInit() {
			(<any>Chart).defaults.global.responsive = true;
			(<any>Chart).defaults.global.animation = false;
			

			var canvas = <HTMLCanvasElement>document.getElementById('graphique');
			this.ctx = canvas.getContext("2d");

			this.chart = new Chart(this.ctx, {
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
					this.chart.data.datasets = this.convert(rels, cpts);
					this.updateChart();
				});
			})

		}

		ngOnDestroy() { 
			
		}

	}

