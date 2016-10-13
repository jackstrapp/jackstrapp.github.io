import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import {DBService} from './model/Database';
import { CompteurService } from './Services/CompteurService';
import { ReleveService } from './Services/ReleveService';
import { AppModule } from './app.module';


platformBrowserDynamic().bootstrapModule(AppModule);

