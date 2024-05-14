import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { ConferencesService } from '../services/conferences.service';
import * as ConferenceActions from './conference.actions';
import { IMItem } from '../models/vh-conference';

@Injectable()
export class ConferenceEffects {
  loadImChatHistoryForActiveConference$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConferenceActions.setActiveConference),
      exhaustMap(() =>
        this.conferencesService.getConferenceMessages().pipe(
          map((imHistory) => {
            const imChat: IMItem[] = imHistory.map((im) => {
              return {
                id: im.id || '',
                from: im.from || '',
                from_display_name: im.from_display_name || '',
                to: im.to || '',
                message: im.message || '',
                timestamp: im.timestamp || new Date(),
                isLoggedInUser: im.is_user || false,
              };
            });
            return ConferenceActions.conferenceMessagesLoaded({ payload: imChat });
          }),
          catchError(() => {
            console.error('Error loading conference messages');
            return EMPTY;
          })
        )
      )
    )
  );

  constructor(private actions$: Actions, private conferencesService: ConferencesService) {}
}
