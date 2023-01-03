import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'filter' })
export class FilterByStatusPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;
        console.log(items);
        searchText = searchText.toLowerCase();
        return items.filter(it => {
            return it.name.toLowerCase().includes(searchText) || it.email.toLowerCase().includes(searchText) || it.phone_number.toLowerCase().includes(searchText);
        });
    }

}