import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routes';
import { GraphComponent } from './components/graph/graph.component';

import { GraphConfigComponent } from './components/graphConfig/graph.config.component';
import { GraphConfigObjectService } from './components/graphConfigService/graph.config.service';


@NgModule({
	imports: [ BrowserModule, FormsModule, AppRoutingModule ],
	declarations: [ GraphComponent, GraphConfigComponent ],
	bootstrap: [ GraphComponent ]
})
export class GraphModule { 

}
