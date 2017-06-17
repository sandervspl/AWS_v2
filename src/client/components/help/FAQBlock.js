// dependencies
import React, { PropTypes } from 'react';

import MoreInfoBtn from 'components/help/MoreInfoBtn';

const FAQBlock = ({ url, children }) =>
  <div style={style.base}>
    {children}
    <MoreInfoBtn url={url} />
  </div>;

FAQBlock.propTypes = {
  url: PropTypes.string.isRequired,
};

const style = {
  base: {
    marginTop: '50px',
    fontSize: '1.05rem',
  },
};

export default FAQBlock;
