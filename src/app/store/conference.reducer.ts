import { createReducer, on } from '@ngrx/store';
import { VHConference } from '../models/vh-conference';
import * as conferenceActions from './conference.actions';

export interface ConferenceState {
  currentConference: VHConference | undefined;
}

export const initialState: ConferenceState = {
  currentConference: undefined,
};

export const conferenceReducer = createReducer(
  initialState,
  on(conferenceActions.setActiveConference, (_state, { payload }) => ({ currentConference: payload })),
  on(conferenceActions.removeActiveConference, (_state) => ({ currentConference: undefined })),
  on(conferenceActions.updateConferenceStatus, (state, { payload }) => {
    if (!state.currentConference) {
      return state;
    }
    return { currentConference: { ...state.currentConference, status: payload.status } };
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
    return { currentConference: { ...state.currentConference, participants: updatedParticipants } };
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
    return { currentConference: { ...state.currentConference, endpoints: updatedEndpoints } };
  })
);

export const getConference = (state: ConferenceState) => state.currentConference;
