import { HttpParams } from '@angular/common/http';
import { LaunchParamTypes } from './launch-param.types';

export class LaunchSearchCriteria {
    limit: number;
    launch_success: boolean;
    land_success: boolean;
    launch_year: number;

    private params: HttpParams;

    constructor() {}

    private setParam(paramName: string, value: number | string | boolean): void {
        if (value != null) {
            this.params = this.params.set(paramName, value.toString());
        }
    }

    toHttpParams(): HttpParams {
        this.params = new HttpParams();
        this.setParam(LaunchParamTypes.limit, this.limit);
        this.setParam(LaunchParamTypes.launchSuccess, this.launch_success);
        this.setParam(LaunchParamTypes.landSuccess, this.land_success);
        this.setParam(LaunchParamTypes.launchYear, this.launch_year);

        return this.params;
    }

}
