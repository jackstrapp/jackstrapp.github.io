import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app.routes';

import { GraphComponent } from './components/graph/graph.component';


@NgModule({
	imports: [ BrowserModule, FormsModule, AppRoutingModule ],
	declarations: [ GraphComponent ],
	bootstrap: [ GraphComponent ]
})
export class GraphModule { }
