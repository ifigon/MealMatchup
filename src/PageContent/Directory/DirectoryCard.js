import React, { Component } from 'react';
import { AccountType } from '../../Enums.js';
import 'typeface-roboto';

// Component for directory card

class DirectoryCard extends Component {
    
    getAvailabilityView() {
        let availabilityList = this.props.availability.map(
            day => <p className='note number' key={day}>{day}</p>
        );

        return (
            <div className='card-detail-3'>
                <p className='title'>Hours of Operation</p>
                { availabilityList }
                <p className='note'>Sun: Closed</p>
            </div>
        ); 
    }

    getDaMemberView() {
        let daMemberListView = this.props.members.map(
            member =>  
                <div className='card-detail-3' key={member.contactName}>
                    <h4>{member.contactName}</h4>
                    <h4>{member.contactTitle}</h4>
                    <p>{member.contactEmail}</p>
                    <p>Business: {member.contactNumber}</p>
                </div>
        );
        return daMemberListView;
    }
    
    render() { 
        
        // get availabilityView if accountType is RECEIVING_AGENCY, otherwise display empty card-detail-2
        let availabilityView = (this.props.accountType === AccountType.RECEIVING_AGENCY) ? 
            this.getAvailabilityView() : <div className='card-detail-3'></div>;

        // get daMemberListView if accountType is DONATING_AGENCY, otherwise display nothing
        let daMemberListView = (this.props.accountType === AccountType.DONATING_AGENCY) ? 
            this.getDaMemberView() : null;

        return (
            <div className='card'>
                <h1 className='orgName'>{ this.props.organization }</h1>
                <hr />
                <div className='cardPicture'>
                    {/* TODO: Center the logo image & add link to logo to the organization's page */}
                    <img src={ this.props.logo } alt='organization logo' />
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
                        <p className='title'>Street Address</p>
                        <p className='note'>{ this.props.address1 }</p>
                        <p className='note'>{ this.props.address2 }</p>
                    </div>
                    
                    { availabilityView }

                    { daMemberListView }

                </div>
            </div>
        );
    }
}



export default DirectoryCard;
