import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderLabelPipe'
})
export class GenderLabelPipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {


return'Miss.'+name; 

}

}
