import { Injectable } from '@angular/core';
import patients from '../../assets/patients.json';

export interface IPatient {
  id: string;
  name: string;
  age: number;
  acceptedOffers: number;
  canceledOffers: number;
  averageReplyTime: number;
}

export interface IFilterObject {
  age?: {
    max: number;
    min: number;
  };
  averageReplyTime?: {
    max: number;
    min: number;
  };
}

export class Thresholds {
  age: number = 0;
  averageReplyTime: number = 0;
}

// filter the card view by age and by averageReplyTime
// sort it by name and by age

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private patients: IPatient[];
  public patientsList: any[] | IPatient[] = patients;
  private patientsFiltered: any[] | IPatient[] = patients;
  private patientsSorted: any[] | IPatient[] = this.patientsFiltered;

  public highest: Thresholds = new Thresholds();
  public lowest: Thresholds = new Thresholds();

  private sortKey: string = 'none';
  private filterObject: IFilterObject | any = {};

  constructor() {
    this.patients = patients;
    this.getMinAndMax();
  }

  getMinAndMax() {
    const highest = {
      age: patients[0].age,
      averageReplyTime: patients[0].averageReplyTime,
    };
    const lowest = {
      age: patients[0].age,
      averageReplyTime: patients[0].averageReplyTime,
    };
    for (const patient of patients) {
      if (patient.averageReplyTime > highest.averageReplyTime)
        highest.averageReplyTime = patient.averageReplyTime;
      else if (patient.averageReplyTime < lowest.averageReplyTime)
        lowest.averageReplyTime = patient.averageReplyTime;
      if (patient.age > highest.age) highest.age = patient.age;
      else if (patient.age < lowest.age) lowest.age = patient.age;
    }
    this.highest = highest;
    this.lowest = lowest;
  }

  public updateSortKey(key: string) {
    this.sortKey = key;
    this.updatePatientsList();
  }

  public updateFilterObject(object: IFilterObject) {
    console.log('newfilterObject receieved: ', object);
    this.filterObject = object;
    console.log('newfilterObject updated: ', this.filterObject);
    this.updatePatientsList();
    console.log(this.patientsList);
  }

  private updatePatientsList() {
    let newPatientsList: any[] | IPatient[] = this.patients;

    // Update filter
    const objectKeys = Object.keys(this.filterObject);
    console.log('filterObject: ', objectKeys);
    console.log('this.patients: ', this.patients);
    if (objectKeys.length === 0) {
      newPatientsList = this.patients;
    } else if (objectKeys.length === 1) {
      const key = objectKeys[0];
      const value11 = this.filterObject[key]['min'];
      const value12 = this.filterObject[key]['max'];
      newPatientsList = this.patients.filter(
        (patient: any) => patient[key] >= value11 && patient[key] <= value12
      );
    } else if (objectKeys.length === 2) {
      const key1 = objectKeys[0];
      const key2 = objectKeys[1];
      const value11 = this.filterObject[key1]['min'];
      const value12 = this.filterObject[key1]['max'];
      const value21 = this.filterObject[key2]['min'];
      const value22 = this.filterObject[key2]['max'];
      newPatientsList = this.patients.filter(
        (patient: any) =>
          patient[key1] >= value11 &&
          patient[key1] <= value12 &&
          patient[key2] >= value21 &&
          patient[key2] <= value22
      );
    }
    // Update sorting
    this.patientsList =
      this.sortKey === 'none'
        ? newPatientsList
        : newPatientsList.sort((a, b) =>
            a[this.sortKey] > b[this.sortKey]
              ? 1
              : a[this.sortKey] < b[this.sortKey]
              ? -1
              : 0
          );
  }
}
