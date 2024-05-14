import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EndpointStatus, ParticipantStatus, VHConference } from '../models/vh-conference';

@Injectable({
  providedIn: 'root',
})
export class ConferencesService {
  constructor() {}

  getConferenceList(): Observable<ConferenceListItem[]> {
    return of([
      {
        id: '1',
        scheduledDateTime: new Date('2024-05-15T10:00:00'),
        duration: 60,
        caseNumber: '12345',
        caseName: 'Test Case',
      },
      {
        id: '2',
        scheduledDateTime: new Date('2024-05-15T11:00:00'),
        duration: 60,
        caseNumber: '12346',
        caseName: 'Test Case 2',
      },
    ]);
  }

  getConference(id: string): Observable<VHConference> {
    return of({
      id: '1',
      scheduledDateTime: new Date('2024-05-15T10:00:00'),
      duration: 60,
      caseNumber: '12345',
      caseName: 'Test Case',
      participants: [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@doe.com',
          username: 'john@hmcts.net',
          status: ParticipantStatus.NotSignedIn,
        },
      ],
      endpoints: [
        {
          id: '10',
          displayName: 'Endpoint 1',
          status: EndpointStatus.NotYetJoined,
          defence_advocate: 'John Doe',
        },
      ],
      messages: [],
    });
  }

  getConferenceMessages(): Observable<ChatResponse[]> {
    console.log('getConferenceMessages');
    const imHistory: ChatResponse[] = [
      {
        id: '1',
        from: 'shaed@test.com',
        from_display_name: 'Shaed Parkar',
        is_user: true,
        message: 'Hello',
        timestamp: new Date('2024-05-15T10:00:00'),
        to: 'Admin',
      },
    ];
    return of(imHistory);
  }
}

export interface ConferenceListItem {
  id: string;
  scheduledDateTime: Date;
  duration: number;
  caseNumber: string;
  caseName: string;
}

export interface ChatResponse {
  /** Message UUID */
  id?: string;
  /** Username of sender */
  from?: string | undefined;
  /** Display name of sender */
  from_display_name?: string | undefined;
  /** Username of recipient */
  to?: string | undefined;
  /** Body of message */
  message?: string | undefined;
  /** Time of message */
  timestamp?: Date;
  /** Did the message originate from user logged in */
  is_user?: boolean;
}
