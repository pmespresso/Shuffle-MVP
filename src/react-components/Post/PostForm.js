import React from 'react';

var Scroll    = require('react-scroll');
var Link       = Scroll.Link;
var DirectLink = Scroll.DirectLink;
var Element    = Scroll.Element;
var Events     = Scroll.Events;
var scroll     = Scroll.animateScroll;
var scrollSpy  = Scroll.scrollSpy;

class PostForm extends React.Component {

  constructor() {
    super();
  }

  componentDidMount() {

    Events.scrollEvent.register('begin', function(to, element) {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register('end', function(to, element) {
      console.log("end", arguments);
    });

    scrollSpy.update();
  }

  componentWillUnmount() {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }

  scrollToTop() {
    scroll.scrollToTop();
  }

  scrollToBottom() {
    scroll.scrollToBottom();
  }

  scrollTo() {
    scroll.scrollTo(100);
  }

  scrollMore() {
    scroll.scrollMore(100);
  }

  renderCategorySelection() {
    return (
      <Element name="categorySelection" className="element">
        <section id="categorySelection">
          <h2>What Is This About?</h2>
          <section>
            <input type="radio" value="Textbook Exchange"/> <label> Textbook Exchange </label>
            <input type="radio" value="Rave Exchange"/> <label > Rave Exchange </label>
            <input type="radio" value="Housing"/> <label > Housing </label>
            <input type="radio" value="Need Help"/> <label> Need Help </label> <br/>
            <input type="radio" value="Offering Help"/> <label> Offering Help  </label>
            <input type="radio" value="Party"/> <label> Party </label>
            <input type="radio" value="Fundraising Event"/> <label> Charity or Fundraising Event </label> <br/>
            <input type="radio" value="Public Service Announcement"/> <label> Public Service Announcement (PSA) </label>
          </section>
          <section className="submit">
            <Link activeClass="active" to="urgencyInfo" containerId="post-form-container" spy={true} smooth={true} offset={50} duration={500} >
            Next
          </Link>
          </section>
        </section>
      </Element>
    );
  }

  renderUrgencySelection() {
    return (
      <Element name="urgencyInfo" className="element">
        <section id="urgencyInfo">
          <h2>Realistically, How Long Before This Post Will Not Matter Anymore? </h2>
          <input type="datetime-local"/>
        </section>
      </Element>
    );
  }

  renderImportantInformationSection() {
    return(
      <section id="primaryInfo">
          <section className="importantInformation">
            <h2>Alright, Now Let's Get to the Point. Seriously, Keep It Short & Sweet.</h2>
            <table>
              <tbody>
                <tr>
                  <td>Name *</td>
                  <td><input placeholder="What are you selling? Maximum 50 characters..." ref="name" maxLength="50"/></td>
                </tr>
                <tr>
                  <td>Description *</td>
                  <td><input placeholder="Enter a description in under 200 characters..." ref="description" maxLength="200"/></td>
                </tr>
                <tr className="media-upload">
                  <td>Media * <br/> Please upload three images.</td>
                  <td>
                    <ImageUpload uploadMedia={this.uploadMedia}/>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
          <footer className="post-footer">
            <button onClick={this.handlePost} className="post-product-btn transition-fast">Create Post!</button>
          </footer>
        </section>
    );
  }


  render() {
    return (
      <div id="post-form-container">
        {this.renderCategorySelection()}
        {this.renderUrgencySelection()}
      </div>
    );
  }
}

export default PostForm;
