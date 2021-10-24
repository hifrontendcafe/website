import { TimeSlot } from './types';

export const getMentorTimeSlots = async (
  id: string,
  date?: string,
): Promise<TimeSlot[]> => {
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
};
