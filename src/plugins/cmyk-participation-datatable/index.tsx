import client from '@/lib/sanity';
import { ThemeProvider } from '@material-ui/core/styles';
import { Card, Flex, Select, Spinner, Text } from '@sanity/ui';
import MUIDataTable from 'mui-datatables';
import Image from 'next/image';
import { useEffect, useState, type ChangeEvent } from 'react';
import pepeJedi from './assets/images/pepe-jedi.gif';
import { columns } from './datatable-columns';
import { options } from './datatable-options';
import datatableTheme from './datatable-theme';

const currentCMYKVersion = 5;

function CMYKParticipationDatatable() {
  const [{ participantsList, cmykVersion, loading }, setState] = useState({
    participantsList: [],
    cmykVersion: currentCMYKVersion.toString(),
    loading: true,
  });

  useEffect(() => {
    const cmkykQuery = `*[_type == "cmykParticipant" &&  cmykVersion == "${cmykVersion}"] { _createdAt, "discordUser": discordUser->username, "email": discordUser->email, aboutParticipant, "timezone":discordUser->timezone, participationType, isChix, workExperience, stackWanted, projects, experience, timeAvailability, otherQuestions, previousKnowledge, status}`;

    client.fetch(cmkykQuery, {}).then((participantsList) => {
      setState((prevState) => ({
        ...prevState,
        participantsList,
        loading: false,
      }));
    });
  }, [cmykVersion]);

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setState((prevState) => ({
      ...prevState,
      cmykVersion: e.target.value,
      loading: true,
    }));
  };

  return !loading ? (
    <ThemeProvider theme={datatableTheme}>
      <MUIDataTable
        title="CMYK | Lista de Participantes"
        columns={columns}
        data={participantsList}
        options={{
          ...options,
          customToolbar: () => (
            <>
              <Select
                value={cmykVersion}
                onChange={handleSelectChange}
                name="cmykVersion"
                aria-label="cmykVersion"
              >
                {[...Array(currentCMYKVersion)].map((_, i) => (
                  <option key={i} value={i + 1}>{`CMYK v${i + 1}.0`}</option>
                ))}
              </Select>

              <Image src={pepeJedi} alt="jedi pepe" width="40" height="40" />
            </>
          ),
        }}
      />
    </ThemeProvider>
  ) : (
    <Card padding={4}>
      <Flex
        direction="column"
        justify="center"
        align="center"
        height="fill"
        gap={3}
      >
        <Spinner muted />
        <Text muted size={1}>
          Cargando...
        </Text>
      </Flex>
    </Card>
  );
}

export default {
  name: 'cmyk-participation-datatable',
  component: CMYKParticipationDatatable,
};
