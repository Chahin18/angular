import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'genderPipe'
})
export class GenderPipePipe implements PipeTransform {
 transform(gender: any): string {
 if (gender == 0) {
 return 'Male';
 }
 return 'Female';
 }
}