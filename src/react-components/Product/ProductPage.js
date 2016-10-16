import React from 'react';

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("ProductPage component mounted");
    console.log(this.props);
  }

  render() {

    return (
      <section>
        <h2></h2>
      </section>
    );
  }


}

export default ProductPage;
