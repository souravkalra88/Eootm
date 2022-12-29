import { Injectable } from '@angular/core';

import { Pipe, PipeTransform } from '@angular/core';



@Injectable({
  providedIn: 'root'
})

@Pipe({name: 'filterByArea'})
export class FilterAdminsPipeServiceimplements PipeTransform {

  transform(areaList : any, areaname: string): any[] {
      if (areaList) {
          return areaList.filter((listing: any) => listing.area_name === areaname);
      }
  }
}
