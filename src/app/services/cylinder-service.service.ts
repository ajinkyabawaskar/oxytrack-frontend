import {Injectable, EventEmitter} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import { Cylinder } from '../models/cylinder.model';

@Injectable()
export class CylinderService {

  apiCallEvent: EventEmitter<any> = new EventEmitter();

  private cylinderSubject: BehaviorSubject<Cylinder>;
  public cylinder: Observable<Cylinder>;
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient) {
    this.cylinderSubject = new BehaviorSubject<Cylinder>(new Cylinder);
    this.cylinder = this.cylinderSubject.asObservable();
  }

  public get cylinderValue(): Cylinder {
    return this.cylinderSubject.value;
  }

  public addCylinder(cylinder : Cylinder) {
    return this.http.post(`${environment.apiUrl}/cylinder/`, cylinder);
  }

  getOwnData() {
    return this.http.get<any>(`${environment.apiUrl}/volunteer/`)
      .pipe(
        map(
          response => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            let user = new User();
            user = response;
            return user;
          }));
  }
}
