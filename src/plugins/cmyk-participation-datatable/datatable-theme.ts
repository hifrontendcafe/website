import { createTheme } from '@material-ui/core';

export const datatableTheme = createTheme({
  overrides: {
    MuiPaper: {
      root: {
        color: 'inherit',
        backgroundColor: 'inherit',
        display: 'flex',
        flexDirection: 'column',
      },
    },

    MuiToolbar: {
      root: {
        '& [class*="actions"]': {
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          flex: '0 1 auto',
        },
      },
    },

    MuiButton: {
      root: {
        color: 'inherit',
        '&:hover': {
          backgroundColor: 'rgb(128 128 128 / 15%) !important',
        },
        '& [class*="sortActive"]': {
          color: 'var(--card-focus-ring-color)',
        },
      },
    },

    MuiTableSortLabel: {
      icon: {
        color: 'var(--card-focus-ring-color) !important',
      },
    },

    MuiIconButton: {
      root: {
        padding: '.5rem',
        color: 'inherit',
        '&:hover': {
          backgroundColor: 'rgb(128 128 128 / 15%) !important',
        },
        '&.Mui-disabled': {
          color: 'rgb(128 128 128 / 50%)',
        },
      },
    },
    //@ts-expect-error Some error
    MUIDataTableSearch: {
      searchIcon: {
        color: 'inherit',
      },
    },
    MuiInputBase: {
      root: {
        color: 'inherit',
      },
    },

    MUIDataTableHeadCell: {
      fixedHeader: {
        color: 'inherit',
        backgroundColor: 'inherit',
        borderTop: '1px solid var(--card-border-color)',
        borderBottom: '1px solid var(--card-border-color)',
        whiteSpace: 'nowrap',
      },
    },

    MuiPopover: {
      paper: {
        backgroundColor: '#fafafa',
      },
    },

    MUIDataTableBodyRow: {
      responsiveStacked: {
        '&': {
          borderColor: 'var(--card-border-color)',
        },
      },
    },

    MuiTableCell: {
      body: {
        color: 'inherit',
      },
      footer: {
        color: 'inherit',
      },
    },
    MUIDataTableBodyCell: {
      stackedParent: {
        borderColor: 'var(--card-border-color)',
      },
    },

    MuiTableRow: {
      root: {
        '&.MuiTableRow-hover': {
          '&:hover': {
            backgroundColor: 'rgb(128 128 128 / 15%)',
          },
        },
      },
    },

    MuiTablePagination: {
      root: {
        color: 'inherit',
      },
    },
    MuiSelect: {
      icon: {
        color: 'inherit',
      },
    },
  },
});

export default datatableTheme;
