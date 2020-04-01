import React from 'react';

import {
  withKnobs,
  text,
  boolean,
  radios
} from "@storybook/addon-knobs";
import Button from '../components/Button';

export const withButton = () => {
  const label = text("Label", "Hello HostUI");
  const disabled = boolean("Disabled", false);

  const options = {
    'default': 'default',
    primary: 'primary',
  };

  const type = radios('Type', options, options.default);
  return <Button type={type} disabled={disabled}>{label}</Button>;
}

export default {
  title: 'Button',
  // component: Button,
  decorators: [withKnobs]
};


