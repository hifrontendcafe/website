import { Meta, StoryObj } from '@storybook/react';
import StaffCard from '.';

const meta = {
  component: StaffCard,
  tags: ['autodocs'],
} satisfies Meta<typeof StaffCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    index: 0,
    profile: {
      _id: '0',
      discordID: 'discordID',
      photo: '', // TODO: Add fallback placeholder?
      username: { current: 'Username' },
      cmykParticipant: [
        {
          aboutParticipant: 'About Participant',
          cmykVersion: '0',
          discordUser: { _ref: '', _type: '_type' },
          experience: 'Experience',
          isChix: false,
          otherQuestions: 'Other Questions',
          previousKnowledge: 'Previous Knowladge',
          projects: 'Projects',
          stackWanted: 'Stack Wanted',
          status: 'Status',
          timeAvailability: 'Time Availability',
          workExperience: 'Work Experience',
          _id: '_id',
          participationLevel: 'Participation Level',
          participationType: 'Participation Type',
        },
      ],
      email: 'email',
      fecTeam: false,
      firstName: 'First Name',
      github: '/#',
      lastName: 'Last Name',
      linkedin: '/#',
      portfolio: 'Portfolio',
      timezone: 'Time Zone',
      twitter: '/#',
    },
  },
};
