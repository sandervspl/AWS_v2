// dependencies
import React, { PropTypes } from 'react';
import TitleSmall from 'components/TitleSmall';

const TextBlockWithImage = ({ children, image, title }) =>
  <div style={style.base}>
    {title && <TitleSmall>{title}</TitleSmall>}
    <div style={style.content}>
      <div style={style.imageContainer}>
        <img src={image} alt="image" style={style.image} />
      </div>
      <div style={style.text}>{children}</div>
    </div>
  </div>;

TextBlockWithImage.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string,
};

const style = {
  base: {
    margin: '20px 0 0',
  },

  content: {
    display: 'flex',
    flexDirection: 'row',
  },

  imageContainer: {
    minWidth: '90px',
  },

  image: {
    height: '100px',
  },

  text: {
    marginLeft: '10px',
  },
};

export default TextBlockWithImage;
