import  { Component } from "@angular/core";

@Component({
	template: `
		<h1> Relevés </h1>
		<h4> Que voulez-vous faire?</h4>
		<p>
		  <button type="button" routerLink="/Releves/make" routerLinkActive="active" class="btn btn-primary btn-lg">Faire un relevé</button>
		  <button type="button" routerLink="/Releves/show" routerLinkActive="active" class="btn btn-default btn-lg">Visualiser les relevés</button>
		</p>

	`

})
export class ReleveHomeComponent{


}