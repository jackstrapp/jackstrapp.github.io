import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { CompteurModule } from './app.module';

import { DBService } from '../model/database';
import { CompteurService } from '../Services/CompteurService';
import { ReleveService } from '../Services/ReleveService';

platformBrowserDynamic().bootstrapModule(CompteurModule);

