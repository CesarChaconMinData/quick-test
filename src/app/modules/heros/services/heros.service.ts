import { Injectable } from '@angular/core';
import { ApiRest } from 'src/app/core/services/rest/api-rest.class';
import { IntHero } from '../schemas/heros.interface';
import { Observable } from 'rxjs';

@Injectable()
export class HerosService extends ApiRest {
  private heros: IntHero[] = [];
  private baseUrl = 'apiFake/heros';

  addHero(hero: IntHero): Observable<any>{
    return this.post(this.baseUrl, hero);
  }

  getAllHeros(): Observable<IntHero[]> {
    return this.get(this.baseUrl);
  }

  getHeroById(id: string): Observable<IntHero> {
    return this.getById(this.baseUrl, id);
  }

  updateHero(data: IntHero): Observable<IntHero[]> {
    return this.put(this.baseUrl, data, data?.id);
  }

  deleteHero(id: number): Observable<IntHero[]> {
    return this.deleteById(this.baseUrl, id);
  }
  get heroAll() {
    return this.heros;
  }
}
