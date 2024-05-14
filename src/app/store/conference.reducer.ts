import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import { VHConference } from '../models/vh-conference';
import * as conferenceActions from './conference.actions';

export interface ConferenceState {
  currentConference: VHConference | undefined;
  conferences: VHConference[];
}

export const initialState: ConferenceState = {
  currentConference: undefined,
  conferences: [],
};

export const conferenceReducer = createReducer(
  initialState,
  on(conferenceActions.setActiveConference, (state, { payload }) => ({ ...state, currentConference: payload })),
  on(conferenceActions.removeActiveConference, (state) => ({ ...state, currentConference: undefined })),
  on(conferenceActions.updateConferenceStatus, (state, { payload }) => {
    if (!state.currentConference) {
      return state;
    }
    return { ...state, currentConference: { ...state.currentConference, status: payload.status } };
  }),
  on(conferenceActions.updateParticipantStatus, (state, { payload }) => {
    if (!state.currentConference) {
      return state;
    }
    const updatedParticipants = state.currentConference.participants.map((p) => {
      if (p.id === payload.id) {
        return { ...p, status: payload.status };
      }
      return p;
    });
    return { ...state, currentConference: { ...state.currentConference, participants: updatedParticipants } };
  }),
  on(conferenceActions.updateEndpointStatus, (state, { payload }) => {
    if (!state.currentConference) {
      return state;
    }
    const updatedEndpoints = state.currentConference.endpoints.map((e) => {
      if (e.id === payload.id) {
        return { ...e, status: payload.status };
      }
      return e;
    });
    return { ...state, currentConference: { ...state.currentConference, endpoints: updatedEndpoints } };
  }),
  on(conferenceActions.conferenceMessagesLoaded, (state, { payload }) => {
    if (!state.currentConference) {
      return state;
    }
    return { ...state, currentConference: { ...state.currentConference, messages: payload } };
  })
);

export const getConfState = createFeatureSelector<ConferenceState>('conference');
export const getActiveConference = (state: ConferenceState) => state.currentConference;
export const getConferencesList = (state: ConferenceState) => state.conferences;
