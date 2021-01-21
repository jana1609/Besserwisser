import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {Category} from './models/category';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]>{
    // TODO: HTTP CALL
    return of([ {id: 1, name: 'Sport'}, {id: 2, name: 'Kultur'}, {id: 2, name: 'Geschichte'}, {id: 3, name: 'Allgemeinwissen'}, {id: 4, name: 'Wissenschaft'}]);
  }
}
