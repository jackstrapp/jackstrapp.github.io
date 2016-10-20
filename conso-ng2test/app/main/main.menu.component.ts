import {Component} from "@angular/core";
import Dexie from "dexie";
import * as Rx from 'rxjs/Rx';


@Component({
	moduleId: module.id,
	template: `
	<div class="container-fluid">
		<div class="row">
			<div class="fill-height col-sm-6 col-md-6 col-lg-6 col-xl-6"> 
				<a class="btn btn-primary" style="width: 100%; margin-top: 10px;" routerLink="/Releves/make" routerLinkActive="active"> 
					<i class="fa fa-pencil fa-6" aria-hidden="true"></i>
				</a>
			</div>
			<div class="fill-height col-sm-6 col-md-6 col-lg-6 col-xl-6"> 
				<a class="btn btn-primary" style="width: 100%; margin-top: 10px;" routerLink="/Charts" routerLinkActive="active"> 
					<i class="fa fa-area-chart fa-6" aria-hidden="true"></i> 
				</a> 
			</div>
		</div>
	</div>	
	`,
	styles: ['i.fa { font-size: 8em;}']
})
export class MainMenuComponent {
	constructor(){
	}

}
