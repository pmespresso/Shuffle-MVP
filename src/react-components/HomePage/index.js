import React from 'react';

import ProductList from '../Product/ProductList';

class HomePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      productList : [
        {
	  			id: 1,
		  		name: "Black Shoes",
		  		media: ['/img/sunbeam.jpeg', '/img/black-shoes.jpg', '/img/black-shoes.jpg'],
		  		upvote: 169,
		  		description: "I've only worn these a few times, looking for a new owner",
          price: "$10",
          size: "small",
          tags: ["Shoes", "Prada", "Sexy"],
          location: "",
          expires: "Tomorrow at Noon",
          tags: ["#Shoes", "#Clothing", "#SecondHand"],
		  		maker: {
		  			name: 'Satish Rao',
		  			avatar: '/img/rao.jpg'
		  		}
		  	},

        {
	  			id: 2,
		  		name: "Cookies For Charity at Sproul!",
		  		media: ['/img/cal-cookies.jpg', '/img/cal-balloons.jpg', '/img/cal-cookies.jpg'],
		  		upvote: 300,
		  		description: "Delta Delta Delta are holding a charity event for homeless people on Sproul! Come support! ",
          price: "$1",
          size: "small",
          tags: ["#Cookies", "#Sproul", "#TriDelt"],
          location: "",
          expires: "5pm",
          tags: ["#Cookies", "#Charity", "#TriDelt"],
		  		maker: {
		  			name: "Nicole O'Shea",
		  			avatar: "/img/nicole.jpg"
		  		}
		  	},
        {
	  			id: 3,
		  		name: "Cookies For Charity at Sproul!",
		  		media: ['/img/cal-balloons.jpg', '/img/cal-balloons.jpg', '/img/cal-cookies.jpg'],
		  		upvote: 300,
		  		description: "Delta Delta Delta are holding a charity event for homeless people on Sproul! Come support! ",
          price: "$1",
          size: "small",
          tags: ["#MORE", "#COOKIES", "#CHARITY"],
          location: "",
          expires: "5pm",
		  		maker: {
		  			name: "Nicole O'Shea",
		  			avatar: "/img/nicole.jpg"
		  		}
		  	},
        {
	  			id: 1,
		  		name: "Black Shoes",
		  		media: ['/img/sunbeam.jpeg', '/img/black-shoes.jpg', '/img/black-shoes.jpg'],
		  		upvote: 169,
		  		description: "I've only worn these a few times, looking for a new owner",
          price: "$10",
          size: "small",
          tags: ["#Shoes", "#Prada", "#Sexy"],
          location: "",
          expires: "Tomorrow at Noon",
		  		maker: {
		  			name: 'Satish Rao',
		  			avatar: '/img/rao.jpg'
		  		}
		  	},

        {
	  			id: 2,
		  		name: "Cookies For Charity at Sproul!",
		  		media: ['/img/cal-cookies.jpg', '/img/cal-balloons.jpg', '/img/cal-cookies.jpg'],
		  		upvote: 300,
		  		description: "Delta Delta Delta are holding a charity event for homeless people on Sproul! Come support! ",
          price: "$1",
          size: "small",
          tags: ["#Cookies", "#Sproul", "#TriDelt"],
          location: "",
          expires: "5pm",
		  		maker: {
		  			name: "Nicole O'Shea",
		  			avatar: "/img/nicole.jpg"
		  		}
		  	},

        {
	  			id: 3,
		  		name: "Cookies For Charity at Sproul!",
		  		media: ['/img/cal-balloons.jpg', '/img/cal-balloons.jpg', '/img/cal-cookies.jpg'],
		  		upvote: 300,
		  		description: "Delta Delta Delta are holding a charity event for homeless people on Sproul! Come support! ",
          price: "$1",
          size: "small",
          tags: ["#MORE", "#COOKIES", "#CHARITY"],
          location: "",
          expires: "5pm",
		  		maker: {
		  			name: "Nicole O'Shea",
		  			avatar: "/img/nicole.jpg"
		  		}
		  	}

      ]

    }
  }

  render() {
    return (
      <section>
					<section className="container-fluid">

						{
							this.state.productList
							?
							<ProductList productList={this.state.productList}/>
							:
							null
						}

					</section>
				</section>

    );
  }

}

export default HomePage;
