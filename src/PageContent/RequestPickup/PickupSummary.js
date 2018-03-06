import React from 'react';
import './PickupSummary.css';
import truck from '../../icons/green-truck.svg';
import Map from '../../Map/Map.js';

class PickupSummary extends React.Component {
    render() {
        // Render nothing if the "show" prop is false
        if(!this.props.show) {
            return null;
        }
        return (
            <div className="backdrop">
                {/* TODO: fix background opacity. Maybe with iFrame. */}
                <div className="modal">
                    <div className="top-line"></div>
                    <p id="exit" onClick={this.props.onClose}>&times;</p>
                    <div className="summary-title flex">
                        <img src={truck} alt="truck"></img>
                        <p id="title">{this.props.type}</p>
                    </div>
                    <div className="wrapper grid">
                        <div className="details grid">
                            <p id="subheading">Pickup Details</p>
                            <p>Start Date: {this.props.dayOfWeek}, {this.props.startDate}</p>
                            {
                                this.props.duration.type === 'date' ?
                                    <p>End Date: {this.props.duration.value}</p>
                                    :
                                    this.props.repeats === 'weekly' ? 
                                        <p>{this.props.duration.value} pickups requested for every {this.props.dayOfWeek}</p>
                                        :
                                        this.props.repeats === 'biweekly' ?
                                            <p>{this.props.duration.value} pickups requested for every other {this.props.dayOfWeek}</p>
                                            :
                                            // TODO: calculate nth day of month
                                            <p>{this.props.duration.value} pickups requested for {this.props.repeats}</p>
                            }
                            
                            <p>Pickup between {this.props.startTime} and {this.props.endTime}</p>
                        </div>
                        <div className="flex">
                            <div className="agency grid">
                                <p id="subheading">Dining Hall</p>
                                <p id="name">Local Point</p>
                                <div className="contact">
                                    <p>Andrea</p>
                                    <p>###-###-####</p>
                                    <p>email</p>
                                </div>
                            </div>
                            {/* TODO: Pass in address into map */}
                            <Map></Map>
                        </div>
                        {this.props.notes !== '' ?
                            <div className="details grid">
                                <p id="subheading">Notes for Pickup</p>
                                <p>{this.props.notes}</p>
                            </div>
                            :
                            <br/>
                        }
                    
                        <div className="footer">
                            <input type="submit" value="Confirm" onClick={this.props.onConfirm}/> 
                            <input type="submit" value="Cancel" onClick={this.props.onClose}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PickupSummary;