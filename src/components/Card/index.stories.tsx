import { Meta, StoryObj } from '@storybook/react';
import { Card } from '.';

const meta = {
  title: 'Components/Cards/Card',
  component: Card,
  subcomponents: {
    Header: Card.Header,
    Image: Card.Image,
    Headline: Card.Headline,
    Title: Card.Title,
    Body: Card.Body,
    Paragraph: Card.Paragraph,
    Actions: Card.Actions,
    PrimaryAction: Card.PrimaryAction,
    SecondaryAction: Card.SecondaryAction,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// TODO: Consider refactoring the Card component.
export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <Card.Header>
        <Card.Image src="https://placehold.co/600x400" alt="Storybook logo" />
        <Card.Title>Title</Card.Title>
        <Card.Headline>Headline</Card.Headline>
      </Card.Header>

      <Card.Body>
        <Card.Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error vitae
          repellat dolores iste, maxime neque delectus, debitis ipsa omnis
          architecto a earum eaque, reprehenderit sequi atque eius voluptate
          expedita laboriosam!
        </Card.Paragraph>
      </Card.Body>
      <Card.Actions>
        <Card.PrimaryAction href="/">Button 1</Card.PrimaryAction>
        <Card.SecondaryAction href="#">Button 2</Card.SecondaryAction>
      </Card.Actions>
    </Card>
  ),
};
