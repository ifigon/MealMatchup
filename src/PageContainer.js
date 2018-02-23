import React, {Component} from 'react';
import { PageContent } from './Enums.js';
import firebase, { auth } from './FirebaseConfig.js';
import NavBar from './PageLayout/Navigation/NavBar.js';
import PageHeader from './PageLayout/PageHeader.js';
import logo from './icons/temp-logo.svg'
import RecurringPickupRequest from './PageContent/RequestPickup/RecurringPickupRequest'

// The page to load when user is signed in.
// Consist of the base page layout and page content depending on which tab is chosen.
// Default page content is Calendar.

class PageContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            content: props.content,
            account: props.account
        };

        this.handler = this.handler.bind(this)
    }

    handler(e) {
        this.setState({
            content: e
        })
        console.log('container: ' + this.state.content)
    }

    render(){
        return(
            <div className="">
                <header className="">
                    <PageHeader logo={logo} title={this.props.account.name}></PageHeader>
                </header>
                <NavBar accountType={this.props.account.accountType} handler={this.handler.bind(this)}></NavBar>

                {/* TODO: hook up with navbar */}
                {/* TODO: replace placeholder text with real components */}
                <div style={{marginLeft: 210 + 'px'}}>Content Placeholder:
                {this.state.content === PageContent.CALENDAR &&
                    <div>Calendar</div>
                }
                {this.state.content === PageContent.ASSIGN_VOLUNTEERS &&
                    <div>Assign Volunteers</div>
                }
                {this.state.content === PageContent.REQUEST_PICKUP &&
                    <RecurringPickupRequest account={this.state.account}></RecurringPickupRequest> 
                }
                {this.state.content === PageContent.FOOD_LOGS &&
                    <div>Food Logs</div>
                }
                {this.state.content === PageContent.DIRECTORY &&
                    <div>Directory</div>
                }
                {this.state.content === PageContent.SETTINGS &&
                    <div>Settings</div>
                }
                </div>
            </div>
        )
    }
}
export default PageContainer;
