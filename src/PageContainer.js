import React, {Component} from 'react';
import { PageContent } from './Enums.js';
import NavBar from './PageLayout/Navigation/NavBar.js';
import PageHeader from './PageLayout/PageHeader.js';
// import RecurringDeliveryRequestController from './PageLayout/Notification/Recurring/RecurringDeliveryRequestController.js';
// import RecurringDeliveryRequestNotification from './PageLayout/Notification/Recurring/RecurringDeliveryRequestNotification';
import RecurringDeliveryRequestNotification from './PageLayout/Notification/Emergency/EmergencyDeliveryRequestNotification';
import EmergencyDeliveryRequestController from './PageLayout/Notification/Emergency/EmergencyDeliveryRequestController.js';

import logo from './icons/temp-logo.svg';

// The page to load when user is signed in.
// Consist of the base page layout and page content depending on which tab is chosen.
// Default page content is Calendar.

class PageContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            content: props.content,
            showPopUp: false,
            hover: false
        };
        
        this.navBarHandler = this.navBarHandler.bind(this);
    }

    openPopUp(){
        this.setState({
            showPopUp: true,
            hover: false
        });
    }

    closePopUp(){
        this.setState({
            showPopUp: false
        });
    }

    hover(){
        this.setState({
            hover: true
        });
    }

    navBarHandler(e) {
        this.setState({
            content: e
        });
    }
 
    render(){
        return(
            <div>
                {/* <header > */}
                <PageHeader hover={this.hover.bind(this)} logo={logo} title={this.props.account.name}></PageHeader>
                {/* </header> */}
                <NavBar content={this.state.content} accountType={this.props.account.accountType} handler={this.navBarHandler}></NavBar>

                {/* TODO: replace placeholder text with real components */}
                {this.state.content === PageContent.CALENDAR &&
                    <div style={{marginTop: '120px', marginLeft:'250px'}}>Calendar</div>
                }
                {this.state.content === PageContent.ASSIGN_VOLUNTEERS &&
                    <div style={{marginTop: '120px', marginLeft:'250px'}}>Assign Volunteers</div>
                }
                {this.state.content === PageContent.REQUEST_PICKUP &&
                    <div style={{marginTop: '120px', marginLeft:'250px'}}>Request Pickup</div>
                }
                {this.state.content === PageContent.FOOD_LOGS &&
                    <div style={{marginTop: '120px', marginLeft:'250px'}}>Food Logs</div>
                }
                {this.state.content === PageContent.DIRECTORY &&
                    <div style={{marginTop: '120px', marginLeft:'250px'}}>Directory</div>
                }
                {this.state.content === PageContent.SETTINGS &&
                    <div style={{marginTop: '120px', marginLeft:'250px'}}>Settings</div>
                }
                {this.state.hover ? 
                    <RecurringDeliveryRequestNotification clickNotification={this.openPopUp.bind(this)}/>
                    : null
                }
                {this.state.showPopUp ?
                    <EmergencyDeliveryRequestController closePopUp={this.closePopUp.bind(this)}/>
                    : null    
                }

            </div>
        );
    }
}
export default PageContainer;
