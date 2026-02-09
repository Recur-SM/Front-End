export interface Mentee {
  menteeId: number;
  menteeName: string;
  username: string;
}

export interface MenteeResult {
  mentorId: number;
  mentorName: string;
  mentees: Mentee[];
}

export interface MenteeResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: MenteeResult;
}