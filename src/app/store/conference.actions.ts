import { createAction, props } from '@ngrx/store';
import { ConferenceStatus, EndpointStatus, ParticipantStatus, VHConference } from '../models/vh-conference';

export const setActiveConference = createAction('[Conference] Add Conference', props<{ payload: VHConference }>());
export const removeActiveConference = createAction('[Conference] Remove Conference');

export const updateConferenceStatus = createAction(
  '[Conference] Update Participant Status',
  props<{ payload: ConferenceUpdatedPayload }>()
);

export const updateParticipantStatus = createAction(
  '[Conference] Update Participant Status',
  props<{ payload: UpdateParticipantStatusPayload }>()
);
export const updateEndpointStatus = createAction(
  '[Conference] Update Endpoint Status',
  props<{ payload: UpdatEndpointStatusPayload }>()
);

export interface ConferenceUpdatedPayload {
  id: string;
  status: ConferenceStatus;
}

export interface UpdateParticipantStatusPayload {
  id: string;
  name: string;
  status: ParticipantStatus;
}

export interface UpdatEndpointStatusPayload {
  id: string;
  status: EndpointStatus;
}
