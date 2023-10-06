import { FormControl, NativeSelect } from '@material-ui/core';
import { Spinner } from '@sanity/ui';
import MUIDataTable from 'mui-datatables';
import React from 'react';
import client from '@/lib/sanity';
import pepeJedi from './assets/images/pepe-jedi.gif';
import Image from 'next/image';

const workExperienceLabels = {
  level0: 'Hasta 6 meses',
  level1: 'Entre 6 meses y 1 año',
  level2: 'Más de un año',
  level3: 'Hasta 1 año',
  level4: 'Entre 1 año y 3 años',
  level5: 'Más de 3 años',
};

const stackWantedLabels = {
  front: 'Frontend (React)',
  back: 'Backend (Node/Express)',
  both: 'Ambos',
};

const projectsLabels = {
  flashcards: 'App Flashcards',
  callForPapers: 'App Administrador call for papars',
  both: 'No tengo preferencias',
};

class CMYKParticipationDatatable extends React.Component {
  state = {
    loading: true,
    cmykParticipantsList: [],
    cmykVersion: '5',
  };

  componentDidMount() {
    this.getCMYKParticipants();
  }

  getCMYKParticipants = (cmykVer = 4) => {
    client
      .fetch(
        `*[_type == "cmykParticipant" &&  cmykVersion == "${cmykVer}"] { _createdAt, "discordUser": discordUser->username, "email": discordUser->email, aboutParticipant, "timezone":discordUser->timezone, participationType, isChix, workExperience, stackWanted, projects, experience, timeAvailability, otherQuestions, previousKnowledge, status}`,
        {},
      )
      .then((cmykPart) => {
        this.setState({ cmykParticipantsList: cmykPart, loading: false });
      });
  };

  render() {
    const handleSelectChange = (value) => {
      this.setState({ cmykVersion: value.target.value, loading: true });
      this.getCMYKParticipants(parseInt(value.target.value, 10));
    };
    const columns = [
      {
        name: '_createdAt',
        label: 'Fecha',
        options: {
          filter: false,
          sort: true,
          customBodyRender: (value) => new Date(value).toLocaleString(),
        },
      },
      {
        name: 'discordUser',
        label: 'Usuario',
        options: {
          filter: false,
          sort: true,
        },
      },
      {
        name: 'email',
        label: 'Email',
        options: {
          filter: false,
          sort: true,
        },
      },
      {
        name: 'timezone',
        label: 'Zona Horaria',
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: 'timeAvailability',
        label: 'Disponibilidad horaria (semanal)',
        options: {
          filter: false,
          sort: true,
          customBodyRender: (value) =>
            value === '>2<4hours'
              ? 'Entre 2 y 4 horas'
              : value === '>4<6hours'
              ? 'Entre 4 y 6 horas'
              : 'Más de 6 horas',
        },
      },
      {
        name: 'aboutParticipant',
        label: 'Sobre mí',
        options: {
          filter: false,
          sort: false,
        },
      },
      {
        name: 'participationType',
        label: 'Form',
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value) =>
            value === 'lider' ? 'Líder' : 'Participante',
        },
      },
      {
        name: 'workExperience',
        label: 'Experiencia Laboral',
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value) => workExperienceLabels[value],
        },
      },
      {
        name: 'stackWanted',
        label: 'Front o Back',
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value) => stackWantedLabels[value],
        },
      },
      {
        name: 'projects',
        label: 'Proyecto',
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value) => projectsLabels[value],
        },
      },
      {
        name: 'previousKnowledge',
        label: 'Conocimientos',
        options: {
          filter: false,
          sort: false,
        },
      },
      {
        name: 'otherQuestions',
        label: 'Otras preguntas',
        options: {
          filter: false,
          sort: false,
        },
      },
      {
        name: 'status',
        label: 'Estado',
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value) =>
            value === 'revision' ? '🟡' : value === 'approved' ? '🟢' : '🔴',
        },
      },
    ];

    const CustomBtn = () => {
      return (
        <>
          <FormControl style={{ margin: '10px 0' }}>
            <NativeSelect
              value={this.state.cmykVersion}
              onChange={handleSelectChange}
              name="cmykVersion"
              inputProps={{ 'aria-label': 'cmykVersion' }}
            >
              <option value="1">CMYK v1.0</option>
              <option value="2">CMYK v2.0</option>
              <option value="3">CMYK v3.0</option>
              <option value="4">CMYK v4.0</option>
              <option value="5">CMYK v5.0</option>
            </NativeSelect>
          </FormControl>
          <Image src={pepeJedi} alt="jedi pepe" width="40" height="40" />
        </>
      );
    };

    const options = {
      downloadOptions: { filename: 'cmypParticipantsList.csv', separator: ';' },
      selectableRowsHeader: false,
      selectableRowsHideCheckboxes: true,
      rowsPerPage: 15,
      rowsPerPageOptions: [10, 15, 20, 30, 50],
      customToolbar: () => <CustomBtn />,
      textLabels: {
        body: {
          noMatch: 'No hay resultados',
          toolTip: 'Sort',
          columnHeaderTooltip: (column) => `Ordenar por ${column.label}`,
        },
        pagination: {
          next: 'Siguiente',
          previous: 'Anterior',
          rowsPerPage: 'Filas por página:',
          displayRows: 'de',
        },
        toolbar: {
          search: 'Buscar',
          downloadCsv: 'Descargar CSV',
          print: 'Imprimir',
          viewColumns: 'Ver Columnas',
          filterTable: 'Filtrar Tabla',
        },
        filter: {
          all: 'Todos',
          title: 'FILTROS',
          reset: 'RESET',
        },
        viewColumns: {
          title: 'Ver Columnas',
          titleAria: 'Mostrar/Ocultar Columnas',
        },
      },
    };

    return (
      <div>
        {/* TODO: Use components from '@sanity/ui' | https://www.sanity.io/ui */}
        {!this.state.loading ? (
          <MUIDataTable
            title="CMYK | Lista de Participantes"
            data={this.state.cmykParticipantsList}
            columns={columns}
            options={options}
          />
        ) : (
          <div>
            <Spinner />
            <p>Cargando...</p>
          </div>
        )}
      </div>
    );
  }
}

export default {
  name: 'cmyk-participation-datatable',
  component: CMYKParticipationDatatable,
};
