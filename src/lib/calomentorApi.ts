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
    return error;
  }
};

export const getMentorList = async (
  preview = false,
): Promise<MentorCalomentor[]> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_CALOMENTOR_BASE_URL}/user`;
    return await fetch(url, {
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_CALOMENTOR_API_KEY,
      },
    })
      .then((response) => response.json())
      .then((response: { data: MentorCalomentor[] }) => {
        console.log(response.data);
        return response.data;
      });
  } catch (error) {
    return error;
  }
};

export const createMentorship = async (
  data: Mentorship,
): Promise<MentorshipResponse> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_CALOMENTOR_BASE_URL}/sf/mentorship`;
    console.log(url);
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
        console.log(response);
        return response;
      });
  } catch (error) {
    console.log(error);
    return error;
  }
};
