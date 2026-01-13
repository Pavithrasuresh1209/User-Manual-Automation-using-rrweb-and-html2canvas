import { Injectable } from '@angular/core';
import * as rrweb from 'rrweb';

@Injectable({
  providedIn: 'root'
})
export class RrwebService {

  private events: any[] = [];
  private stopFn: any;

  startRecording() {
    this.events = [];
    this.stopFn = rrweb.record({
      emit: (event) => {
        this.events.push(event);
      }
    });
  }

  stopRecording() {
    if (this.stopFn) {
      this.stopFn();
    }
    return this.events;
  }
}
