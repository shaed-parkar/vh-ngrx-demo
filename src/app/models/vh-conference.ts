export interface VHConference {
  id: string;
  scheduledDateTime: Date;
  duration: number;
  caseNumber: string;
  caseName: string;
  participants: Array<Participant>;
  endpoints: Array<Endpoint>;
  messages: Array<IMItem>;
}

export interface Participant {
  id: string;
  name: string;
  email: string;
  username: string;
  status: ParticipantStatus;
}

export interface Endpoint {
  id?: string;
  displayName: string | undefined;
  status: EndpointStatus;
  defence_advocate: string | undefined;
}

export enum ConferenceStatus {
  NotStarted = 'NotStarted',
  InSession = 'InSession',
  Paused = 'Paused',
  Suspended = 'Suspended',
  Closed = 'Closed',
}

export enum ParticipantStatus {
  None = 'None',
  NotSignedIn = 'NotSignedIn',
  UnableToJoin = 'UnableToJoin',
  Joining = 'Joining',
  Available = 'Available',
  InHearing = 'InHearing',
  InConsultation = 'InConsultation',
  Disconnected = 'Disconnected',
}

export enum EndpointStatus {
  NotYetJoined = 'NotYetJoined',
  Connected = 'Connected',
  Disconnected = 'Disconnected',
  InConsultation = 'InConsultation',
}

export interface IMItem {
  id?: string;
  from?: string;
  from_display_name?: string;
  to?: string;
  message: string;
  timestamp: Date;
  /** Did the message originate from user logged in */
  isLoggedInUser: boolean;
}
