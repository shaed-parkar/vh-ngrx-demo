import { createSelector } from '@ngrx/store';
import { getConfState, ConferenceState } from './conference.reducer';

export const confState = createSelector(getConfState, (state: ConferenceState) => state);

export const selectActiveConference = createSelector(confState, (state) => state.currentConference);
export const selectParticipantList = createSelector(selectActiveConference, (state) => state?.participants);
export const selectEndpointList = createSelector(selectActiveConference, (state) => state?.endpoints);
export const selectConferenceMessages = createSelector(selectActiveConference, (state) => state?.messages);

export const selectConferenceList = createSelector(confState, (state) => state.conferences);
