import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.less';

const Button = ({
  type, inline, children, ...rest
}) => {
  const cls = classNames({
    'hu-btn': true,
    'hu-btn-primary': type === 'primary',
    'hu-btn-normal': type === 'normal',
    'hu-btn-block': !inline,
  });
  return (
    <button type="button" className={`${cls}`} {...rest}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: 'normal',
  inline: true,
  children: '',
};

Button.propTypes = {
  type: PropTypes.oneOf(['primary', 'normal', 'danger']),
  inline: PropTypes.bool,
  children: PropTypes.element,
};

export default Button;
