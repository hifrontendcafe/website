import { MUIDataTableProps } from 'mui-datatables';

export const options: MUIDataTableProps['options'] = {
  downloadOptions: { filename: 'cmypParticipantsList.csv', separator: ';' },
  selectableRowsHeader: false,
  selectableRowsHideCheckboxes: true,
  rowsPerPage: 15,
  rowsPerPageOptions: [10, 15, 20, 30, 50],
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
