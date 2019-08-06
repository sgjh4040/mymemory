import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { MoviePageModule } from './search/api/movie/movie.module';
export function jwtOptionsFactory(storage) {
    return {
        tokenGetter: () => {
            return storage.get('access_token');
        },
        whitelistedDomains: ['172.30.1.38:5000']
    };
}
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    NgModule({
        declarations: [AppComponent],
        entryComponents: [],
        imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
            HttpClientModule,
            MoviePageModule,
            IonicStorageModule.forRoot(),
            JwtModule.forRoot({
                jwtOptionsProvider: {
                    provide: JWT_OPTIONS,
                    useFactory: jwtOptionsFactory,
                    deps: [Storage],
                }
            })],
        providers: [
            StatusBar,
            SplashScreen,
            { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
        ],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map