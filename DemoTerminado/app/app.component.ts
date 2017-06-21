/// <reference path="../typings/tsd.d.ts" />

import {Component} from 'angular2/core';
import { Observable } from 'rxjs/Rx';
import { ChuckNorrisService } from './app.chucknorris.service';
import { HTTP_PROVIDERS } from 'angular2/http';

@Component({
    selector: 'my-app',
    template: `
        <input id="search" type="text" class="form-control">
        <button class="btn btn-primary" (click)="cancelSubscription()">Cancelar subscripción</button>
        <button class="btn btn-default" (click)="createSubscription()">Crear subscripción</button>
        <div *ngIf='jokes.length !== 0'>
            <h1>Jokes</h1>
            <div *ngFor='#joke of jokes'>{{ joke.value }}</div> 
        </div>
    `,
    providers: [ ChuckNorrisService , HTTP_PROVIDERS ]
})
export class AppComponent {
    public keysup: any;
    public subscripcion: any;
    public jokes: Array<any> = [];

    constructor(private chuckNorrisService: ChuckNorrisService) {
        this.createSubscription();
    }

    cancelSubscription() {
        if(!this.subscripcion.isUnsubscribed) {
            this.subscripcion.unsubscribe();
            this.subscripcion === undefined;
            console.log("Desubscrito");
        }
    }   

    createSubscription() {
        if(this.subscripcion === undefined || this.subscripcion.isUnsubscribed) {
            this.keysup = Observable.fromEvent($("#search"), 'keyup')
            .map(e => e.target.value)
            .filter(text => text.length >= 3)
            .debounceTime(400)
            .distinctUntilChanged()
            .flatMap(searchTerm => {
                var observable = Observable.forkJoin(
                    this.chuckNorrisService.getInfo(searchTerm),
                    this.chuckNorrisService.getUsers());
                return observable;
            })
                            
            this.subscripcion = this.keysup.subscribe(data => {
                console.log(data);
                this.jokes = data[0].result;
            });
        }
    }
}