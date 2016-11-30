[1mdiff --git a/conso-ng2test/app/Graph_module/components/graph/graph.component.js b/conso-ng2test/app/Graph_module/components/graph/graph.component.js[m
[1mindex 24026d9..81a4ed3 100644[m
[1m--- a/conso-ng2test/app/Graph_module/components/graph/graph.component.js[m
[1m+++ b/conso-ng2test/app/Graph_module/components/graph/graph.component.js[m
[36m@@ -24,7 +24,9 @@[m [mlet GraphComponent = class GraphComponent {[m
     ngOnInit() {[m
         chart_js_1.Chart.defaults.global.responsive = true;[m
         chart_js_1.Chart.defaults.global.animation = false;[m
[31m-        this.config.confUpdated.subscribe(() => { this.render(); });[m
[32m+[m[32m        this.config.confUpdated.subscribe(() => {[m
[32m+[m[32m            this.updateSeries();[m
[32m+[m[32m        });[m
         var canvas = document.getElementById('graphique');[m
         this.ctx = canvas.getContext("2d");[m
         this.chart = new chart_js_1.Chart(this.ctx, {[m
[36m@@ -70,12 +72,22 @@[m [mlet GraphComponent = class GraphComponent {[m
             });[m
         });[m
     }[m
[32m+[m[32m    updateSeries() {[m
[32m+[m[32m        this.chart.data.datasets.forEach((ds) => {[m
[32m+[m[32m            var cpt = this.originalCompteurs.find(x => x.name == ds.label);[m
[32m+[m[32m            if (cpt) {[m
[32m+[m[32m                var datas = this.originalData.filter(x => x.idCompteur == cpt.idCompteur);[m
[32m+[m[32m                ds.data = this.config.conversionFilter(datas, cpt);[m
[32m+[m[32m            }[m
[32m+[m[32m        });[m
[32m+[m[32m        this.chart.update();[m
[32m+[m[32m    }[m
     render() {[m
         this.chart.data.datasets = this.convert(this.originalData, this.originalCompteurs);[m
[31m-        this.updateChart();[m
[32m+[m[32m        this.chart.update();[m
     }[m
     convert(datas, cpts) {[m
[31m-        var result = new Array();[m
[32m+[m[32m        let result = new Array();[m
         let moneyColor = "#85BB65";[m
         let overallPrice = {[m
             label: "prix global",[m
[36m@@ -88,7 +100,7 @@[m [mlet GraphComponent = class GraphComponent {[m
         };[m
         cpts.forEach((cpt) => {[m
             //init des infos du compteur[m
[31m-            var color = cpt.color;[m
[32m+[m[32m            let color = cpt.color;[m
             let currentScatterDataSet = {[m
                 label: cpt.name,[m
                 borderColor: color,[m
[36m@@ -99,47 +111,32 @@[m [mlet GraphComponent = class GraphComponent {[m
                 tooltipUnity: this.config.Conso && this.config.Price ? ("€/J") : (cpt.unity.trim() + (this.config.Conso ? '/J' : ''))[m
             };[m
             //définition des points de la courbe du compteur[m
[31m-            datas.filter(x => x.idCompteur == cpt.idCompteur).sort((a, b) => { if (a.date > b.date)[m
[31m-                return 1;[m
[31m-            else[m
[31m-                return -1; }).forEach((x, i, arr) => {[m
[31m-                if (this.config.Conso) {[m
[31m-                    if (i) {[m
[31m-                        let previousData = arr[i - 1];[m
[31m-                        //nbDays between current read and the previous one[m
[31m-                        let nbDays = Math.ceil(Math.abs(previousData.date.getTime() - x.date.getTime()) / (1000 * 3600 * 24));[m
[31m-                        currentScatterDataSet.data.push({[m
[31m-                            x: x.date,[m
[31m-                            y: (x.valeur - previousData.valeur) * (this.config.Price ? cpt.price : 1) / nbDays,[m
[31m-                            comment: x.comment[m
[31m-                        });[m
[31m-                    }[m
[32m+[m[32m            currentScatterDataSet.data = this.config.conversionFilter(datas.filter(x => x.idCompteur == cpt.idCompteur), cpt);[m
[32m+[m[32m            currentScatterDataSet.data.length == 0 || result.push(currentScatterDataSet);[m
[32m+[m[32m        });[m
[32m+[m[32m        if (this.config.Conso && this.config.Price) {[m
[32m+[m[32m            let overallDatas = new Array();[m
[32m+[m[32m            result.forEach((item, index, arr) => {[m
[32m+[m[32m                item.data.map((item, index, arr) => {[m
[32m+[m[32m                    var existing = overallDatas.find(x => +x.x == +item.x);[m
[32m+[m[32m                    if (existing)[m
[32m+[m[32m                        existing.y += item.y;[m
                     else[m
[31m-                        currentScatterDataSet.data.push({[m
[31m-                            x: x.date,[m
[31m-                            y: 0,[m
[31m-                            comment: x.comment[m
[32m+[m[32m                        overallDatas.push({[m
[32m+[m[32m                            x: item.x,[m
[32m+[m[32m                            y: item.y[m
                         });[m
[31m-                }[m
[31m-                else {[m
[31m-                    currentScatterDataSet.data.push({[m
[31m-                        x: x.date,[m
[31m-                        y: x.valeur,[m
[31m-                        comment: x.comment[m
[31m-                    });[m
[31m-                }[m
[32m+[m[32m                });[m
             });[m
[31m-            if (currentScatterDataSet.data.length)[m
[31m-                result.push(currentScatterDataSet);[m
[31m-        });[m
[31m-        if (overallPrice.data.length)[m
[31m-            result.push(overallPrice);[m
[32m+[m[32m            overallPrice.data = overallDatas.sort((a, b) => { if (a.x > b.x)[m
[32m+[m[32m                return 1;[m
[32m+[m[32m            else[m
[32m+[m[32m                return -1; });[m
[32m+[m[32m        }[m
[32m+[m[32m        overallPrice.data.length == 0 || result.push(overallPrice);[m
         //retour des courbes des compteus[m
         return result;[m
     }[m
[31m-    updateChart() {[m
[31m-        this.chart.update();[m
[31m-    }[m
     ngOnDestroy() {[m
     }[m
 };[m
[1mdiff --git a/conso-ng2test/app/Graph_module/components/graph/graph.component.js.map b/conso-ng2test/app/Graph_module/components/graph/graph.component.js.map[m
[1mindex fc92af3..0b64407 100644[m
[1m--- a/conso-ng2test/app/Graph_module/components/graph/graph.component.js.map[m
[1m+++ b/conso-ng2test/app/Graph_module/components/graph/graph.component.js.map[m
[36m@@ -1 +1 @@[m
[31m-{"version":3,"file":"graph.component.js","sourceRoot":"","sources":["graph.component.ts"],"names":[],"mappings":";;;;;;;;;;AAAA,uBAEO,eAAe,CAAC,CAAA;AAEvB,yBAAuB,iBAAiB,CAAC,CAAA;AAIzC,kCAA8B,mCAAmC,CAAC,CAAA;AAClE,gCAA4B,iCAAiC,CAAC,CAAA;AAI9D,uCAAuC,4CAA4C,CAAC,CAAA;AAEpF,2BAA0C,UAAU,CAAC,CAAA;AA2DrD;IAEC,YAAoB,UAA2B,EAAU,UAAyB,EAAS,MAAgC,EAAU,QAAkB;QAAnI,eAAU,GAAV,UAAU,CAAiB;QAAU,eAAU,GAAV,UAAU,CAAe;QAAS,WAAM,GAAN,MAAM,CAA0B;QAAU,aAAQ,GAAR,QAAQ,CAAU;IAEvJ,CAAC;IAaD,QAAQ;QACD,gBAAM,CAAC,QAAQ,CAAC,MAAM,CAAC,UAAU,GAAG,IAAI,CAAC;QACzC,gBAAM,CAAC,QAAQ,CAAC,MAAM,CAAC,SAAS,GAAG,KAAK,CAAC;QAG/C,IAAI,CAAC,MAAM,CAAC,WAAW,CAAC,SAAS,CAAC,QAAQ,IAAI,CAAC,MAAM,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC;QAE5D,IAAI,MAAM,GAAsB,QAAQ,CAAC,cAAc,CAAC,WAAW,CAAC,CAAC;QACrE,IAAI,CAAC,GAAG,GAAG,MAAM,CAAC,UAAU,CAAC,IAAI,CAAC,CAAC;QAEnC,IAAI,CAAC,KAAK,GAAG,IAAI,gBAAK,CAAC,IAAI,CAAC,GAAG,EAAE;YAChC,IAAI,EAAE,MAAM;YACZ,IAAI,EAAE;gBACL,QAAQ,EAAE,EAAE;aACZ;YACD,eAAe,EAAE,4CAA4C;YAC7D,OAAO,EAAE;gBACR,kDAAkD;gBAClD,8EAA8E;gBAC9E,uDAAuD;gBACvD,kDAAkD;gBAClD,QAAQ,EAAE;oBACT,SAAS,EAAE;wBACV,KAAK,EAAE,CAAC,IAA4B,EAAE,IAAS;4BAC9C,IAAI,QAAQ,GAAqB,IAAI,CAAC,QAAQ,CAAC;4BAC/C,2EAA2E;4BAC3E,MAAM,CAAC,EAAE,CAAC;wBACX,CAAC;wBACD,KAAK,EAAE,CAAC,IAA0B,EAAE,IAAS;4BAC5C,IAAI,QAAQ,GAAqB,IAAI,CAAC,QAAQ,CAAC;4BAC/C,IAAI,KAAK,GAAW,QAAQ,CAAC,IAAI,CAAC,YAAY,CAAC,CAAC,YAAY,CAAC;4BAE7D,MAAM,CAAC,IAAI,CAAC,QAAQ,CAAC,SAAS,CAAC,IAAI,CAAC,MAAM,EAAE,WAAW,CAAC,GAAG,KAAK,GAAG,IAAI,CAAC,MAAM,GAAG,GAAG,GAAG,KAAK,CAAC;wBAC9F,CAAC;qBACD;iBACD;gBACD,MAAM,EAAE;oBACP,KAAK,EAAE,CAAC;4BACP,IAAI,EAAE,MAAM;4BACZ,IAAI,EAAE;gCACL,cAAc,EAAE,EAUf;6BACD;yBACD,CAAC;iBACF;aACD;SACD,CAAC,CAAC;QAEH,IAAI,CAAC,UAAU,CAAC,OAAO,EAAE,CAAC,SAAS,CA