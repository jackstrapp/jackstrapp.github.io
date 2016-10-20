import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { GraphComponent } from './components/Graph/graph.component';



@NgModule({
	imports: [
	RouterModule.forRoot([
		{path: 'Charts', component: GraphComponent}
		])]
		,
	exports: [
	RouterModule
	]
})
export class AppRoutingModule {}