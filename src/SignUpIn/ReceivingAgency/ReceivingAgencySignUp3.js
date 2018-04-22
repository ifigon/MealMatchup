import React, { Component } from 'react';
import moment from 'moment-timezone';
import truck from '../../icons/truck.svg';

class ReceivingAgencySignUp3 extends Component {
    constructor(props) {
        super(props);

        this.dayNames = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat'];

        this.nextStep = this.nextStep.bind(this);
        this.dayRow = this.dayRow.bind(this);
    }

    dayRow(i, day) {
        var checkboxName = day + 'Check';
        var startName = day + 'Start';
        var endName = day + 'End';

        // populate default values if exists
        var checked = false;
        var startTime = '';
        var endTime = '';
        var availabilities = this.props.fieldValues.availabilities;
        if (availabilities && availabilities[i]) {
            checked = true;
            startTime = availabilities[i].startTime;
            endTime = availabilities[i].endTime;
        }

        return (
            <div className="row" key={day}> 
                <input type="checkbox" name={checkboxName} defaultChecked={checked} />
                <div className="day">{day}</div>
                {/* TODO: AM/PM UI */}
                <input type="time" name={startName} defaultValue={startTime} className="ra3-inputBox" />
                <span className="ra3-spacing">to</span>
                <input type="time" name={endName} defaultValue={endTime} className="ra3-inputBox" />
            </div>
        );
    }

    render() {
        return (
            <form onSubmit={this.nextStep}>
                <div className="signup-content">
                    <div className="form-block ra3-form-block">
                        <label className="form-component delivery">Delivery Days</label>
                        {this.dayNames.map((day, i) => {
                            return this.dayRow(i, day);
                        })}
                        <div className="emergency-pickup">
                            <label className="emergency-pickup-label">Emergency Pick Up Available</label><img alt="icon" className="icon" src={truck} type="image/svg+xml" /><br />
                            <input type="checkbox" name="acceptEmergency" defaultChecked={this.props.fieldValues.emergencyAvailable} />
                            <p className="pickup-p">Pick up food from donating agency, if notified, in cases of emergency.</p>
                        </div>
                        <div className="food-weight">
                            Amount of food preferred: <br />
                            <div className="lbs-wrapper lbs-wrapper1">
                                <input type="number" className="lbs" name="startLbs" defaultValue={this.props.fieldValues.startLbs} /> <i>lbs</i>
                            </div> to 
                            <div className="lbs-wrapper lbs-wrapper2">
                                <input type="number" className="lbs" name="endLbs" defaultValue={this.props.fieldValues.endLbs} /> <i>lbs</i>
                            </div>
                        </div>
                    </div>

                    <div className="buttons ra3-buttons">
                        <span className="cancel" onClick={this.props.previousStep}>BACK</span>
                        <input type="submit" className="next" value="NEXT"></input>
                    </div>
                </div>
            </form>
        );
    }
    nextStep(e) {
        e.preventDefault();

        var availabilities = {};
        for (let i in this.dayNames) {
            var day = this.dayNames[i];
            var checkboxName = day + 'Check';

            // only add availability if checkbox was checked
            if (e.target[checkboxName].checked) {
                var startStr = e.target[day + 'Start'].value; // eg "10:00"
                var endStr = e.target[day + 'End'].value; // eg "17:00"
                var dayTimeFormat = 'e HH:mm';  // eg "3 10:00" for Wed 10AM
                var startTimestamp = moment(i + ' ' + startStr, dayTimeFormat);
                var endTimestamp = moment(i + ' ' + endStr, dayTimeFormat);

                availabilities[i] = {
                    startTimestamp: startTimestamp.valueOf(),
                    endTimestamp: endTimestamp.valueOf()
                };
            }
        }

        var data = {
            availabilities: availabilities,
            emergencyAvailable: e.target.acceptEmergency.checked,
            startLbs: e.target.startLbs.value,
            endLbs: e.target.endLbs.value,
        };

        this.props.saveValues(data);
        this.props.nextStep();
    }
}
export default ReceivingAgencySignUp3;