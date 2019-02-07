import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EventsListComponent } from './components/events-list/events-list.component';
import { EventComponent } from './components/event/event.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
    declarations: [
        AppComponent,
        EventsListComponent,
        EventComponent,
        LoaderComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        HttpClientModule,
        AngularSvgIconModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
