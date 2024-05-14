import { createAction, props } from '@ngrx/store';
import { ConferenceStatus, EndpointStatus, IMItem, ParticipantStatus, VHConference } from '../models/vh-conference';

export const setActiveConference = createAction('[Conference] Set Active Conference', props<{ payload: VHConference }>());
export const removeActiveConference = createAction('[Conference] Remove Conference');

export const startJudgePolling = createAction('[ConferenceList] Start Judge List Polling');
export const stopJudgePolling = createAction('[ConferenceList] Stop Judge List Polling');
export const conferenceListLoaded = createAction('[ConferenceList] Conference List Loaded', props<{ payload: VHConference[] }>());

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

export const conferenceMessagesLoaded = createAction('[Conference] Conference Messages Loaded', props<{ payload: IMItem[] }>());

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

export interface conferenceMessagesLoadedPayload {
  messages: IMItem[];
}
