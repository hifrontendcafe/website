import {
  MentorCalomentor,
  Mentorship,
  MentorshipResponse,
  TimeSlot,
} from './types';

export const getMentorTimeSlots = async (
  id: string,
  date?: string,
): Promise<TimeSlot[]> => {
  try {
    const url = `${
      process.env.NEXT_PUBLIC_CALOMENTOR_BASE_URL
    }/time-slot/user/${id}${date ? '?slot_date=' + date : ''}`;
    return await fetch(url, {
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_CALOMENTOR_API_KEY,
      },
    })
      .then((response) => response.json())
      .then((response: { data: TimeSlot[] }) => {
        return response.data.filter((ts) => !ts.is_occupied);
      });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getMentorList = async (): Promise<MentorCalomentor[]> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_CALOMENTOR_BASE_URL}/user`;
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
    console.log(error);
    return error;
  }
};

export const createMentorship = async (
  data: Mentorship,
): Promise<MentorshipResponse> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_CALOMENTOR_BASE_URL}/sf/mentorship`;
    return await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_CALOMENTOR_API_KEY,
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((response) => response.json())
      .then((response: MentorshipResponse) => {
        console.log(response);
        return response;
      });
  } catch (error) {
    console.log(error);
    return error;
  }
};
