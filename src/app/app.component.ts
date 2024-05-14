import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConferenceState } from './store/conference.reducer';
import * as ConferenceActions from './store/conference.actions';
import * as ConferenceSelectors from './store/conference.selectors';
import { EndpointStatus, ParticipantStatus, VHConference } from './models/vh-conference';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <h1 class="govuk-heading-l">Test Actions</h1>

    <h2 class="govuk-heading-m">Conference List</h2>
    <div class="govuk-button-group">
      <button type="button" (click)="startListPolling()" class="govuk-button" data-module="govuk-button">Get List</button>
      <button type="button" (click)="stopListPolling()" class="govuk-button govuk-button--secondary" data-module="govuk-button">
        Stop List
      </button>
    </div>

    <dl class="govuk-summary-list">
      <div class="govuk-summary-list__row" *ngFor="let conf of conferences">
        <dt class="govuk-summary-list__key">Case Name</dt>
        <dd class="govuk-summary-list__value">{{ conf.caseName }} - {{ conf.scheduledDateTime | date : 'medium' }}</dd>
      </div>
    </dl>

    <h2 class="govuk-heading-m">Selected Conference</h2>
    <div class="govuk-button-group">
      <button type="button" (click)="loadConference()" class="govuk-button" data-module="govuk-button">Load Conference</button>
      <button type="button" (click)="removeConference()" class="govuk-button govuk-button--secondary" data-module="govuk-button">
        Remove Conference
      </button>

      <button type="button" (click)="updateParticipantStatus()" class="govuk-button" data-module="govuk-button">
        Update ParticipantStatus
      </button>

      <button
        type="button"
        (click)="updateEndpointStatus()"
        class="govuk-button govuk-button--secondary"
        data-module="govuk-button"
      >
        Update EndpointStatus
      </button>
    </div>

    <dl class="govuk-summary-list" *ngIf="conference">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">Case Name</dt>
        <dd class="govuk-summary-list__value">
          {{ conference.caseName }}
        </dd>
      </div>
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">Scheduled Start Time</dt>
        <dd class="govuk-summary-list__value">
          {{ conference.scheduledDateTime | date : 'medium' }}
        </dd>
      </div>

      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">IM Count</dt>
        <dd class="govuk-summary-list__value">
          {{ conference.messages.length }}
        </dd>
      </div>

      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">Participant</dt>
        <dd class="govuk-summary-list__value">{{ conference.participants[0].name }} - {{ conference.participants[0].status }}</dd>
      </div>

      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">Endpoint</dt>
        <dd class="govuk-summary-list__value">
          {{ conference.endpoints[0].displayName }} - {{ conference.endpoints[0].status }}
        </dd>
      </div>
    </dl>
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent implements OnDestroy {
  title = 'vh-ngrx-demo';

  private onDestroy$ = new Subject<void>();
  conference: VHConference | undefined = undefined;
  conferences: VHConference[] = [];

  constructor(private store: Store<ConferenceState>) {
    this.store
      .select(ConferenceSelectors.selectActiveConference)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((conf) => {
        this.conference = conf;
      });

    this.store
      .select(ConferenceSelectors.selectConferenceList)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((confs) => {
        this.conferences = confs;
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  loadConference() {
    this.store.dispatch(
      ConferenceActions.setActiveConference({
        payload: {
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
        },
      })
    );
  }

  startListPolling() {
    this.store.dispatch(ConferenceActions.startJudgePolling());
  }

  stopListPolling() {
    this.store.dispatch(ConferenceActions.stopJudgePolling());
  }

  removeConference() {
    this.store.dispatch(ConferenceActions.removeActiveConference());
  }

  updateParticipantStatus() {
    this.store.dispatch(
      ConferenceActions.updateParticipantStatus({
        payload: {
          id: '1',
          name: 'John Doe Updated',
          status: ParticipantStatus.Joining,
        },
      })
    );

    this.store.dispatch(
      ConferenceActions.updateParticipantStatus({
        payload: {
          id: '2',
          name: 'Does not exist',
          status: ParticipantStatus.Available,
        },
      })
    );
  }

  updateEndpointStatus() {
    this.store.dispatch(
      ConferenceActions.updateEndpointStatus({
        payload: {
          id: '10',
          status: EndpointStatus.Connected,
        },
      })
    );
  }
}
