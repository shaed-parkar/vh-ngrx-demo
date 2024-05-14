import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConferenceState } from './store/conference.reducer';
import * as ConferenceActions from './store/conference.actions';
import { EndpointStatus, ParticipantStatus } from './models/vh-conference';

@Component({
  selector: 'app-root',
  template: `
    <h1 class="govuk-heading-l">Test Actions</h1>

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
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'vh-ngrx-demo';

  constructor(private store: Store<ConferenceState>) {}

  loadConference() {
    this.store.dispatch(
      ConferenceActions.setActiveConference({
        payload: {
          id: '1',
          scheduledDateTime: new Date(),
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
        },
      })
    );
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
