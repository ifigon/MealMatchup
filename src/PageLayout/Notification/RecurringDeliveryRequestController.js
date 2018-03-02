import React from 'react';
import createReactClass from 'create-react-class'
import './Notification.css';

import RecurringDeliveryRequest1 from './RecurringDeliveryRequest1';
import RecurringDeliveryRequest2 from './RecurringDeliveryRequest2';



let RecurringDeliveryRequestController = createReactClass({
    getInitialState: function () {
        return {
            step: 1
        }
    },
    nextStep: function () {
        this.setState({
            step: this.state.step + 1
        })
    },

    previousStep: function () {
        this.setState({
            step: this.state.step - 1
        })
    },

    showStep: function () {
        switch (this.state.step) {
            default:
                return <div className="signup">
                    <RecurringDeliveryRequest1 
                        nextStep={this.nextStep}
                       />
                </div>
                case 2:
                return   
                <div className="signup">            
                <RecurringDeliveryRequest2 
                    nextStep={this.nextStep}
                   />
                   </div>

            // case 3:
            //     return <div className="signup">
            //         <div className="circle-wrapper">
            //             <div className="circle open"></div><div className="circle open"></div><div className="circle"></div><div className="circle open"></div>
            //         </div>
            //         <ReceivingAgencySignUp3 fieldValues={fieldValues}
            //             nextStep={this.nextStep}
            //             previousStep={this.previousStep}
            //             saveValues={this.saveValues} /></div>
        }
    },

    render() {
        //let highlightLineColor = this.state.lineHighlighted ? "white" : "black"
        return (
            <div className="signup-wrapper">
                {this.showStep()}
            </div>
        )
    }
})
export default RecurringDeliveryRequestController;