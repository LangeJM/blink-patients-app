import { Component } from '@angular/core';
import { DataService } from './services/data.service';
import {
  faFilter,
  faArrowDownShortWide,
  faArrowUpShortWide,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import { IFilterObject } from './services/data.service';

export interface IFilterOptions {
  name: string;
  key: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'patients-management-app';
  patients: any = [];
  filterIcon = faFilter;
  sortingUpIcon = faArrowUpShortWide;
  sortingDownIcon = faArrowDownShortWide;
  chevronUpIcon = faChevronUp;
  chevronDownIcon = faChevronDown;

  sortingOptions: IFilterOptions[] = [
    { name: 'None', key: 'none' },
    { name: 'Age', key: 'age' },
    { name: 'Name', key: 'name' },
  ];
  filterOptions: IFilterOptions[] = [
    { name: 'Age', key: 'age' },
    { name: 'Reply Time', key: 'averageReplyTime' },
  ];
  sortingActive: boolean = true;
  sortingDescending: boolean = true;
  sortingOptionsOpen: boolean = false;
  selectedSortingOption: string = 'None';
  filterActive: boolean = true;
  filterOptionsOpen: boolean = false;

  ageMin: number = this.dataService.lowest.age;
  ageMax: number = this.dataService.highest.age;
  repliesMin: number = this.dataService.lowest.averageReplyTime;
  repliesMax: number = this.dataService.highest.averageReplyTime;

  inputAgeMin: number = this.ageMin;
  inputAgeMax: number = this.ageMax;
  inputRepliesMin: number = this.repliesMin;
  inputRepliesMax: number = this.repliesMax;

  ageFilterChecked: boolean = false;
  repliesFilterChecked: boolean = false;

  constructor(public dataService: DataService) {}

  ngOnInit() {
    this.dataService.updateSortKey('none');
  }

  handleMinChange(key: string, e: any) {
    if (key === 'age') {
      if (e.target.value < this.ageMin) this.inputAgeMin = this.ageMin;
      else if (e.target.value > this.inputAgeMax)
        this.inputAgeMin = this.inputAgeMax;
      else this.inputAgeMin = e.target.value;
    } else if (key === 'averageReplyTime') {
      if (e.target.value < this.repliesMin)
        this.inputRepliesMin = this.repliesMin;
      else if (e.target.value > this.inputRepliesMax)
        this.inputRepliesMin = this.inputRepliesMax;
      else this.inputRepliesMin = e.target.value;
    }
    this.ageFilterChecked || this.repliesFilterChecked
      ? this.updateFilter()
      : null;
  }

  handleMaxChange(key: string, e: any) {
    if (key === 'age') {
      if (e.target.value < this.inputAgeMin)
        this.inputAgeMax = this.inputAgeMin;
      else if (e.target.value > this.ageMax) this.inputAgeMax = this.ageMax;
      else this.inputAgeMax = e.target.value;
    } else if (key === 'averageReplyTime') {
      if (e.target.value < this.inputRepliesMin)
        this.inputRepliesMax = this.inputRepliesMin;
      else if (e.target.value > this.repliesMax)
        this.inputRepliesMax = this.repliesMax;
      else this.inputRepliesMax = e.target.value;
    }
    this.ageFilterChecked || this.repliesFilterChecked
      ? this.updateFilter()
      : null;
  }

  handleCheckBoxChange(key: string, e: any) {
    if (key === 'age') {
      e.target.checked
        ? (this.ageFilterChecked = true)
        : (this.ageFilterChecked = false);
    } else if (key === 'averageReplyTime') {
      e.target.checked
        ? (this.repliesFilterChecked = true)
        : (this.repliesFilterChecked = false);
    }
    this.updateFilter();
  }

  updateFilter() {
    const obj: IFilterObject = {};
    if (this.ageFilterChecked) {
      obj['age'] = { min: this.inputAgeMin, max: this.inputAgeMax };
    }
    if (this.repliesFilterChecked) {
      obj['averageReplyTime'] = {
        min: this.inputRepliesMin,
        max: this.inputRepliesMax,
      };
    }
    this.dataService.updateFilterObject(obj);
  }

  deactivateFilter() {
    this.ageFilterChecked = false;
    this.repliesFilterChecked = false;
    this.updateFilter();
  }

  toggleSortingMode() {
    this.sortingDescending = !this.sortingDescending;
  }

  toggleFilterOptions() {
    this.filterOptionsOpen = !this.filterOptionsOpen;
    this.sortingOptionsOpen = false;
  }

  toggleSortingOptions() {
    this.sortingOptionsOpen = !this.sortingOptionsOpen;
    this.filterOptionsOpen = false;
  }

  selectSortingOption(key: string) {
    this.selectedSortingOption = key;
    if (key === 'none') this.sortingActive = false;
    else this.sortingActive = true;
    this.dataService.updateSortKey(key);
  }
}
