import React from 'react';
import { StickyContainer, Sticky } from 'react-sticky';

class Post extends React.Component {

  renderPostButton() {
    return (
      <section className="post-btn-container">
        <div className="post-btn transition-medium">+</div>
        <div className="post-btn-desc transition-fast">POST</div>
      </section>
    );
  }

  render() {
    return (
      <section className="post-section">
        {this.renderPostButton()}
      </section>
    );
  }

}

export default Post;
