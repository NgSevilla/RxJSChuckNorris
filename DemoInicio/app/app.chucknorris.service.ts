import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ChuckNorrisService {
    
    constructor(private http: Http) {
        
    }

    getInfo(search: string) {
        return this.http.get("https://api.chucknorris.io/jokes/search?query=" + search)
            .map(res => res.json());
    }

    getUsers() {
        return this.http.get("https://jsonplaceholder.typicode.com/users")
            .map(res => res.json());
    }
}