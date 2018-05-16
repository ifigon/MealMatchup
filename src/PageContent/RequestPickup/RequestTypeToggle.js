import React, { Component } from 'react';
import { DeliveryType } from '../../Enums';
import './Toggle.css';
import info from '../../icons/info.svg';
import ReactTooltip from 'react-tooltip';

class RequestTypeToggle extends Component {
    render() {
        let infoTooltip = '';
        if (this.props.type === DeliveryType.EMERGENCY) {
            infoTooltip =
                'A recurring pickup is used in cases where  <br /> regular pickups are needed, i.e.   once/ <br />twice a week, every other  week/month etc.';
        } else {
            infoTooltip =
                'An emergency pickup is a one  <br /> time donation where a shelter  <br /> will pickup the food directly.';
        }
        return (
            <div className="toggle-wrapper" onClick={this.props.toggle}>
                <div className="toggle-container">
                    {this.props.type === DeliveryType.EMERGENCY ? (
                        <div className="recurring-toggle toggle">
                            Schedule Recurring Pickup
                        </div>
                    ) : (
                        <div className="emergency-toggle toggle">
                            Schedule Emergency Pickup
                        </div>
                        )}
                    <a data-tip={infoTooltip}>
                        {' '}
                        <img
                            className="toggle-info"
                            src={info}
                            alt="information"
                        />{' '}
                    </a>

                    <ReactTooltip
                        multiline={true}
                        place="right"
                        type="dark"
                        effect="solid"
                    />
                </div>
            </div>
        );
    }
}
export default RequestTypeToggle;
