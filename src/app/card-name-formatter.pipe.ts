import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardNameFormatter',
  standalone: true
})
export class CardNameFormatterPipe implements PipeTransform {

  transform(value: string, ...args: string[]): string | null {
    if (!value) return value;
    return value
      .split(' ')
      .map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      })
      .join(' ')
  }

}
