import { useState, useEffect } from 'react';
import { getWarningsById } from '../../lib/calomentor';

export function useWarnings(id: string) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [warnings, setWarnings] = useState<number>(0);
  const [mentorships, setMentorships] = useState<number>(0);

  const getWarnings = async () => {
    let response: Response;
    try {
      response = await getWarningsById(id);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }

    if (!response?.ok) {
      setIsError(true);
      setIsLoading(false);
    }

    const { data } = await response.json();

    setWarnings(data?.active_warnings);
    setMentorships(data?.mentorships);
    setIsLoading(false);
  };

  useEffect(() => {
    getWarnings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return { isLoading, isError, warnings, mentorships };
}
