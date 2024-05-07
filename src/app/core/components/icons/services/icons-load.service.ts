import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRest } from 'src/app/core/services/rest/api-rest.class';

@Injectable()
export class IconsLoadService extends ApiRest {
  getIcon(name: string): Observable<string> {
    const url = 'assets/icons/';
    return this.get<string>(`${url}${name}.svg`, {
      responseType: 'text',
    });
  }
}
