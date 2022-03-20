import {
  MentorCalomentor,
  Mentorship,
  MentorshipResponse,
  TimeSlot,
  TIMESLOT_STATUS,
} from './types';

export const getMentorTimeSlots = async (
  id: string,
  date?: string,
): Promise<TimeSlot[]> => {
  try {
    const url = `${
      process.env.NEXT_PUBLIC_CALOMENTOR_BASE_URL
    }/time-slot/user/${id}?only_free=true&only_future=true${
      date ? '&slot_date=' + date : ''
    }`;
    return await fetch(url, {
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_CALOMENTOR_API_KEY,
      },
    })
      .then((response) => response.json())
      .then((response: { data: TimeSlot[] }) => {
        return response.data.filter(
          (ts) => ts.timeslot_status === TIMESLOT_STATUS.FREE,
        );
      });
  } catch (error) {
    return error;
  }
};

export const getAllMentorTimeSlots = async (
  mentors: MentorCalomentor[],
): Promise<TimeSlot[][]> => {
  try {
    const mentorsTimeSlots = await Promise.all(
      mentors.map((m) => getMentorTimeSlots(m.id)),
    );
    return mentorsTimeSlots.filter((m) => m.length > 0);
  } catch (error) {
    return error;
  }
};

export const getMentorList = async (): Promise<MentorCalomentor[]> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_CALOMENTOR_BASE_URL}/user?only_in_the_program=true`;
    return await fetch(url, {
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_CALOMENTOR_API_KEY,
      },
    })
      .then((response) => response.json())
      .then((response: { data: MentorCalomentor[] }) => {
        return response.data;
      });
  } catch (error) {
    console.log('err', error);
    return error;
  }
};

export const createMentorship = async (
  data: Mentorship,
): Promise<MentorshipResponse> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_CALOMENTOR_BASE_URL}/mentorship`;
    return await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_CALOMENTOR_API_KEY,
        'Content-type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response: MentorshipResponse) => {
        return response;
      });
  } catch (error) {
    return error;
  }
};
