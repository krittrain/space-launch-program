import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { LaunchSearchCriteria } from './services/launch/launch-search-criteria';
import { LaunchService } from './services/launch/launch.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  readonly limit = 100;

  readonly filtersYear: Array<number> = [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];
  readonly filtersSuccess: Array<number> = [0, 1];
  allSpaceXLaunches: Array<any> = [];

  allLaunchesSubscription: Subscription;

  activeYear: number;
  activeLaunch: boolean;
  activeLanding: boolean;

  loading = false;

  constructor(private launchService: LaunchService) {}

  ngOnInit(): void {
    this.getAllLaunchesData();
  }

  private getAllLaunchesData(): void {
    this.allSpaceXLaunches = [];
    this.loading = true;
    const options: LaunchSearchCriteria = Object.assign(new LaunchSearchCriteria(), {
      limit: this.limit,
      launch_success: this.activeLaunch,
      land_success: this.activeLanding,
      launch_year: this.activeYear
    });
    this.allLaunchesSubscription = this.launchService.getAllLaunches(options).subscribe((response: Array<any>) => {
      this.loading = false;
      this.allSpaceXLaunches = [...response];
    });
  }

  getLaunchStatus(launchDetails: any): string {
    switch (launchDetails.launch_success) {
      case true:
        return 'True';
      case false:
        return 'False';
      default:
        return 'N/A';
    }
  }

  getLandingStatus(launchDetails: any): string {
    switch (launchDetails.rocket.first_stage.cores[0].land_success) {
      case true:
        return 'True';
      case false:
        return 'False';
      default:
        return 'N/A';
    }
  }

  onYearFilter(year: number): void {
    this.activeYear = year;
    this.getAllLaunchesData();
  }

  onLaunchFilter(value: number): void {
    this.activeLaunch = value ? true : false;
    this.getAllLaunchesData();
  }

  onLandingFilter(value: number): void {
    this.activeLanding = value ? true : false;
    this.getAllLaunchesData();
  }

  ngOnDestroy(): void {
    this.allLaunchesSubscription.unsubscribe();
  }
}
