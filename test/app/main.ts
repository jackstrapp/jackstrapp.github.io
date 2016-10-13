import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import {DBService} from './model/Database';
import { CompteurService } from './Services/CompteurService';
import { ReleveService } from './Services/ReleveService';
import { AppModule } from './app.module';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';


platformBrowserDynamic().bootstrapModule(AppModule, [
  ROUTER_PROVIDERS,
  {provide: LocationStrategy, useClass: HashLocationStrategy}
]);


