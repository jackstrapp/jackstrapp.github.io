// ====== ./app/app.component.ts ======
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'my-app',
  templateUrl: './app/main/main.component.template.html'
  // template: `
  //   <div class="demo-layout-transparent mdl-layout mdl-js-layout">
  //     <header class="mdl-layout__header mdl-layout__header--transparent">
  //       <div class="mdl-layout__header-row">

  //         <!-- Title -->
  //         <span class="mdl-layout-title">Scotch Pets</span>

  //         <!-- Add spacer, to align navigation to the right -->
  //         <div class="mdl-layout-spacer"></div>

  //         <!-- Navigation with router directives-->
  //         <nav class="mdl-navigation">
  //           <a class="mdl-navigation__link" [routerLink]="['/Compteurs']">Compteurs</a>
  //           <a class="mdl-navigation__link" [routerLink]="['/crisis-center']">crisis-center</a>
  //         </nav>
  //       </div>
  //     </header>
  //   </div>

  //   <!-- Router Outlet -->
  //   <router-outlet></router-outlet>
  // `
})
export class AppComponent {}