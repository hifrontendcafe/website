import { ComponentStory, ComponentMeta } from '@storybook/react';
import HeroComponent from './index';

export default {
  title: 'Components/Hero',
  component: HeroComponent,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof HeroComponent>;

const Template: ComponentStory<typeof HeroComponent> = (args) => (
  <>
    <div className="w-full min-h-screen bg-zinc-900">
      <div id="container" className="container relative pt-12 mx-auto">
        <HeroComponent {...args} />
      </div>
    </div>
  </>
);

export const Hero = Template.bind({});

Hero.args = {
  title: 'Prueba',
};

Hero.argTypes = {};
