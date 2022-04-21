export interface Country {
  flags: {
    svg: string;
    png: string;
  };
}

export const getUserCountry = async (): Promise<Country> => {
  const res = await fetch('https://ipapi.co/json/');

  const ip: { country_name: string } = await res.json();

  {
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${ip.country_name.toLowerCase()}`,
    );
    const countries: Country[] = await res.json();

    return countries[0];
  }
};
