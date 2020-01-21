import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {DummyComponent} from './dummy/dummy.component';
import 'firebase/firestore';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {LoginComponent} from './login/login.component';
import {AuthComponent} from './auth/auth.component';
import {FormsModule} from '@angular/forms';
import {ExpensesComponent} from './expenses/expenses.component';
import {ChartsModule} from 'ng2-charts';

@NgModule({
    declarations: [
        AppComponent,
        DummyComponent,
        LoginComponent,
        AuthComponent,
        ExpensesComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        ChartsModule
    ],
    providers: [AngularFirestore],
    bootstrap: [AppComponent]
})
export class AppModule {
}
