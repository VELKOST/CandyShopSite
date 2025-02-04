import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import Text, { TextProps } from './Text';

export default {
  title: 'Components/Text',
  component: Text,
  argTypes: {
    className: { control: 'text' },
    view: {
      control: 'select',
      options: ['title', 'button', 'p-20', 'p-18', 'p-16', 'p-14'],
    },
    tag: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'p', 'span'],
    },
    weight: { control: 'select', options: ['normal', 'medium', 'bold'] },
    color: { control: 'select', options: ['primary', 'secondary', 'accent'] },
    maxLines: { control: 'number' },
  },
} as Meta;

const Template: StoryFn<TextProps> = (args: TextProps) => <Text {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Пример текста',
};

export const Title = Template.bind({});
Title.args = {
  view: 'title',
  tag: 'h1',
  children: 'Заголовок',
};

export const BoldText = Template.bind({});
BoldText.args = {
  weight: 'bold',
  children: 'Жирный текст',
};

export const LimitedLines = Template.bind({});
LimitedLines.args = {
  maxLines: 2,
  children:
    'Длинный текст, который будет ограничен по количеству строк. Длинный текст, который будет ограничен по количеству строк.',
};
