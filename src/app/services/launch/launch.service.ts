import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LaunchSearchCriteria } from './launch-search-criteria';

@Injectable({
  providedIn: 'root'
})
export class LaunchService {
  private launchesControllerURL: string;

  constructor(private httpClient: HttpClient) {
    this.launchesControllerURL = environment.serverURL;
  }

  getAllLaunches(options: LaunchSearchCriteria): Observable<Array<any>> {
    const params = options.toHttpParams();
    return this.httpClient.get<Array<any>>(this.launchesControllerURL, {params: params});
  }

}
