import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { GraphComponent } from './components/graph/graph.component';



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