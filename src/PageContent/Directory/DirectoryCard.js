import React, { Component } from 'react';
import "typeface-roboto";

// Component for directory card

class DirectoryCard extends Component {
  render() {
    // this.props.accountType
		return (
			<div className='card'>
				<h1 className='orgName'>{ this.props.organization }</h1>
				<hr />
				<div className='cardPicture'>
					{/* TODO: Center the logo image & add link to logo to the organization's page */}
					<a href='#'><img src={ this.props.logo } alt='organization logo' /></a>
				</div>
				<div className='cardDetails'>
					<div className='card-detail-3'>
						<p className='title'>Primary Contact</p>
						<p><i>{ this.props.contactTitle }</i></p>
						<p>{ this.props.contactName }</p>
						<p className='note number'>Email: { this.props.contactEmail }</p>
						<p className='note number'>Business: { this.props.contactNumber }</p>
					</div>
					<div className='card-detail-3'>
						<p className='title'>Hours of Operation</p>
						{/* TODO: What do the hours object look like? */}
						<p className='notes'>M-F: 9AM-6PM</p>
						<p>Sat: 10-4pm</p>
						<p className='note'>Sun: Closed</p>
					</div>
					<div className='card-detail-3'>
						<p className='title'>Street Address</p>
						<p className='note'>{ this.props.address1 }</p>
						<p className='note'>{ this.props.address2 }</p>
					</div>

					{/* QUESTION: When is the second row of card details relevant? 
									Only saw one example with a second row. Not sure if it is needed. */}
									
					{/*<h3>Member Accounts</h3>
					<div className='card-detail-3'>
						<h4>Chris Stack</h4>
						<h4>Shelter Manager</h4>
						<p>Email: chris.st@gmail.com</p>
						<p>Business: 208-586-9876</p>
					</div>
					<div className='card-detail-3'>
						<h3><b>Hours of Operation</b></h3>
						<p className='notes'>M-F: 9AM-6PM</p>
						<p>Sat: 10-4pm</p>
						<p>Sun: Closed</p>
					</div>
					<div className='card-detail-3'>
						<h3><b>Street Address</b></h3>
						<p className='note'>123 Seasame St.</p>
						<p className='note'>Seattle, WA 98115</p>
					</div>*/}
				</div>
			</div>
		);
  }
}

export default DirectoryCard;
