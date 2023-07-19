import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResultPassingService {

  result: number = 0;

  setResult(result: number) {
    this.result = result;
  }
}
