import { useEffect, useState } from 'react';
import { getWarningsById } from '../../lib/calomentor';

/**
 * @public
 */
export enum requestWarningsStates {
  INITIAL = 'INITIAL',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export function useWarnings(id: string | undefined) {
  const [status, setStatus] = useState<requestWarningsStates>(
    requestWarningsStates.INITIAL,
  );
  const [warnings, setWarnings] = useState<number>(0);
  const [mentorships, setMentorships] = useState<number>(0);

  useEffect(() => {
    if (!id) {
      setStatus(requestWarningsStates.ERROR);
    } else {
      const getWarnings = async () => {
        let response: Response;
        try {
          response = await getWarningsById(id);
          const { data } = await response.json();

          if (!response?.ok) {
            setStatus(requestWarningsStates.ERROR);
          }

          setWarnings(data?.active_warnings);
          setMentorships(data?.mentorships);
          setStatus(requestWarningsStates.SUCCESS);
        } catch (error) {
          setStatus(requestWarningsStates.ERROR);
        }
      };
      getWarnings();
    }
  }, [id]);

  return { status, warnings, mentorships };
}
