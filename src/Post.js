import React from 'react';
import propTypes from 'prop-types';
import BottomPostTab from './BottomPostTab';

const Post = function ({
  author, content, haveImg, src, altText,
}) {
  return (
    <div>
      <div>
        <div className="font-face-rbold">
          {author}
        </div>
        <div>
          <p className="font-face-rregular">
            {content}
          </p>
        </div>
      </div>
      <div>
        {haveImg
        && <img src={src} alt={altText} />}
      </div>
      <BottomPostTab />
    </div>
  );
};

Post.defaultProps = {
  src: '',
  altText: '',
  haveImg: false,
};

Post.propTypes = {
  author: propTypes.string.isRequired,
  content: propTypes.string.isRequired,
  haveImg: propTypes.bool,
  src: propTypes.string,
  altText: propTypes.string,
};
export default Post;
