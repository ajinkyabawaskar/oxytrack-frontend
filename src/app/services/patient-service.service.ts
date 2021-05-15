import {Injectable, EventEmitter} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import { Patient } from '../models/patient.model';

@Injectable()
export class PatientService {

  apiCallEvent: EventEmitter<any> = new EventEmitter();

  private patientSubject: BehaviorSubject<Patient>;
  public patient: Observable<Patient>;
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient) {
    this.patientSubject = new BehaviorSubject<Patient>(new Patient);
    this.patient = this.patientSubject.asObservable();
  }

  public get patientValue(): Patient {
    return this.patientSubject.value;
  }

  public registerPatient(patient : Patient) {
    return this.http.post(`${environment.apiUrl}/patient/`, patient);
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
