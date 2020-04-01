import React from 'react';

import { action } from '@storybook/addon-actions';
import Button from '../components/Button';

export const Text = () => (
  <>
    <Button onClick={action('clicked')}>Hello Button</Button>
    <Button onClick={action('clicked primary')} type="primary">Hello Button</Button>
    <br />
    <Button onClick={action('clicked primary')} inline={false}>Hello Button</Button>
  </>
);

export default {
  title: 'Button',
  component: Button,
};


