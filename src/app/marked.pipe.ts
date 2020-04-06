import { Pipe, PipeTransform } from '@angular/core';
import * as marked from 'marked';
import * as hljs from 'highlight.js';

@Pipe({
  name: 'marked'
})
export class MarkedPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value == null) {
      return '';
    }

    const mk = marked.setOptions({
      gfm: true,
      highlight: function (code) {
        return hljs.highlightAuto(code, ['java', 'xml', 'go', 'python', 'rust', 'ini', 'json', 'sql']).value;
      },
      xhtml: true
    });

    return mk(value);
  }

}
