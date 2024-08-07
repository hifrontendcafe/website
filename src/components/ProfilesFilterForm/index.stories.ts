import { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';
import ProfilesFilterForm from '.';

const args = {
  technologies: [
    { _id: '0', name: 'Technology' },
    { _id: '1', name: 'Technology' },
  ],
  roles: [
    { _id: '0', name: 'Role' },
    { _id: '1', name: 'Role' },
  ],
  seniorities: [
    { _id: '0', name: 'Seniority' },
    { _id: '1', name: 'Seniority' },
  ],
  filters: {
    active: false,
    available: false,
    description: 'Description',
    location: 'Location',
    roleId: 'roleId',
    seniorityId: 'seniorityId',
    technologies: [
      { _id: '0', name: 'technologies' },
      { _id: '1', name: 'technologies' },
    ],
  },
  dispatch: () => {
    console.log('dispatch');
  },
} satisfies ComponentProps<typeof ProfilesFilterForm>;

const meta = {
  title: 'ProfilesFilterForm',
  component: ProfilesFilterForm,
  args,
  tags: ['autodocs'],
} satisfies Meta<typeof ProfilesFilterForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args,
};
