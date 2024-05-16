// event.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../app/event.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = environment.apiUrl; // Set your API URL from environment

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    const endpoint = `${this.apiUrl}/event/events`; // Define API endpoint
    return this.http.get<Event[]>(endpoint);
  }
}
