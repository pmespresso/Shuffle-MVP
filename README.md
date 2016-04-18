# Shuffle
A marketplace for quick transfer of items within a local community. 

## Pains
Service like eBay and Craigslist:

### Seller's Point of View
	* Takes forever to get a response on a posting
	* My postings get buried in an endless directory of postings that are all styled exactly the same
	* Forget about postings that should have expired
	* Packaging and shipping are a hassle and take time and money and effort

### Buyer's Point of View
	* I don't know if I can trust these sellers even if they have good ratings
	* A lot of these people are going to take several business days to ship. I want it now. 
	* I don't have money right now but I can trade for something else that I own. This can't be negotiated on eBay or Craigslist.


## Objectives
	* Streamline the process of goods/services exchange between members of the same community. i.e. UC Berkeley, Stanford, etc.
	* Create an aesthetically pleasing UI that allows many posts to be discovered.

## Customers
	* [Short Term] University students that:
		* Want to sell their second hand goods for money.
		* Want to exchange their goods for other goods.
		* Want to exchange their services for other people's goods.
		* Want to exchange their services for other people's services.
	* [Long Term] People in any community that want to do the above.

## Competition
	* eBay
	* Craigslist
	* Amazon? 
	* Facebook Selling Groups i.e. Free&For Sale, Clothing, ravExchange, Textbook Exchange

## Value Proposition


## Services

### Model, Controller
	* Firebase - user authentication, post information
	* AWS S3 - post images
	* Venmo API - handle payments
	* Facebook Graph API - handle user profiles, messaging sellers

### View
	* Javascript
	* jQuery
	* In the future, refactor with React.js