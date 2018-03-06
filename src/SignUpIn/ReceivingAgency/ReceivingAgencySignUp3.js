import React, { Component } from 'react';
import truck from '../../icons/truck.svg';

class ReceivingAgencySignUp3 extends Component {
    constructor(props) {
        super(props);
        this.nextStep = this.nextStep.bind(this);
    }

    render() {
        return (
            <form onSubmit={this.nextStep}>
                <div className="signup-content">
                    <div className="form-block">
                        <label className="form-component delivery">Delivery Days</label>
                        <div className="row"> <input className="checkbox" type="checkbox" /><div className="day">Mon</div>
                            <div className="time-input-wrapper">
                                <div className="input-wrapper">
                                    <input name="monStart" className="week" type="text" />
                                    <div className="am-pm">
                                        <span className="am">AM</span>
                                        /
                                        <span className="PM">PM</span>
                                    </div>
                                </div>
                                to
                                <div className="input-wrapper">
                                    <input name="monEnd" type="text" className="week" /><div className="am-pm">
                                        <span className="am">AM</span>
                                        /
                                        <span className="PM">PM</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />

                        <div className="row"> <input name="tueStart" className="checkbox" type="checkbox" /><div className="day">Tue</div>
                            <div className="time-input-wrapper">
                                <div className="input-wrapper">
                                    <input className="week" type="text" />
                                    <div className="am-pm">
                                        <span className="am">AM</span>
                                        /
                                        <span className="PM">PM</span>
                                    </div>
                                </div>
                                to
                                <div className="input-wrapper">
                                    <input name="tueEnd" type="text" className="week" /><div className="am-pm">
                                        <span className="am">AM</span>
                                        /
                                        <span className="PM">PM</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />

                        <div className="row"> <input className="checkbox" type="checkbox" /><div className="day">Wed</div>
                            <div className="time-input-wrapper">
                                <div className="input-wrapper">
                                    <input name="wedStart" className="week" type="text" />
                                    <div className="am-pm">
                                        <span className="am">AM</span>
                                        /
                                        <span className="PM">PM</span>
                                    </div>
                                </div>
                                to
                                <div className="input-wrapper">
                                    <input name="wedEnd" type="text" className="week" /><div className="am-pm">
                                        <span className="am">AM</span>
                                        /
                                        <span className="PM">PM</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />

                        <div className="row"> <input className="checkbox" type="checkbox" /><div className="day">Thur</div>
                            <div className="time-input-wrapper">
                                <div className="input-wrapper">
                                    <input name="thurStart" className="week" type="text" />
                                    <div className="am-pm">
                                        <span className="am">AM</span>
                                        /
                                        <span className="PM">PM</span>
                                    </div>
                                </div>
                                to
                                <div className="input-wrapper">
                                    <input name="thurEnd" type="text" className="week" /><div className="am-pm">
                                        <span className="am">AM</span>
                                        /
                                        <span className="PM">PM</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />

                        <div className="row"> <input className="checkbox" type="checkbox" /><div className="day">Fri</div>
                            <div className="time-input-wrapper">
                                <div className="input-wrapper">
                                    <input name="friStart" className="week" type="text" />
                                    <div className="am-pm">
                                        <span className="am">AM</span>
                                        /
                                        <span className="PM">PM</span>
                                    </div>
                                </div>
                                to
                                <div className="input-wrapper">
                                    <input name="friEnd" type="text" className="week" /><div className="am-pm">
                                        <span className="am">AM</span>
                                        /
                                        <span className="PM">PM</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />

                        <div className="row"> <input className="checkbox" type="checkbox" /><div className="day">Sat</div>
                            <div className="time-input-wrapper">
                                <div className="input-wrapper">
                                    <input name="satStart" className="week" type="text" />
                                    <div className="am-pm">
                                        <span className="am">AM</span>
                                        /
                                        <span className="PM">PM</span>
                                    </div>
                                </div>
                                to
                                <div className="input-wrapper">
                                    <input name="satEnd" type="text" className="week" /><div className="am-pm">
                                        <span className="am">AM</span>
                                        /
                                        <span className="PM">PM</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />

                        <div className="row"> <input className="checkbox" type="checkbox" /><div className="day">Sun</div>
                            <div className="time-input-wrapper">
                                <div className="input-wrapper">
                                    <input name="sunStart" className="week" type="text" />
                                    <div className="am-pm">
                                        <span className="am">AM</span>
                                        /
                                        <span className="PM">PM</span>
                                    </div>
                                </div>
                                to
                                <div className="input-wrapper">
                                    <input name="sunEnd" type="text" className="week" /><div className="am-pm">
                                        <span className="am">AM</span>
                                        /
                                        <span className="PM">PM</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />

                        <div className="emergency-pickup">
                            <label className="emergency-pickup-label">Emergency Pick Up Available</label><img alt="icon" className="icon" src={truck} type="image/svg+xml" /><br />
                            <input type="checkbox" className="checkbox" /><p className="pickup-p">Pick up food from donating agency, if notified, in cases of emergency.</p>
                        </div>
                        <div className="food-weight">
                            Amount of food pnameerred: <br /><div className="lbs-wrapper lbs-wrapper1">
                                <input type="text" className="lbs" name="startLbs" /> <i>lbs</i></div> to <div className="lbs-wrapper lbs-wrapper2"><input name="endLbs" type="text" className="lbs" /> <i>lbs</i></div>
                        </div>
                    </div>

                    <div className="buttons">
                        <span className="cancel" onClick={this.props.previousStep}>BACK</span>
                        <input type="submit" className="next" value="NEXT"></input>
                    </div>
                </div>
            </form>
        );
    }
    nextStep(e) {
        e.preventDefault();
        var data = {
            monStart: e.target.monStart.value,
            monEnd: e.target.monEnd.value,
            tueStart: e.target.tueStart.value,
            tueEnd: e.target.tueEnd.value,
            wedStart: e.target.wedStart.value,
            wedEnd: e.target.wedEnd.value,
            thurStart: e.target.thurStart.value,
            thurEnd: e.target.thurEnd.value,
            friStart: e.target.friStart.value,
            friEnd: e.target.friEnd.value,
            satStart: e.target.satStart.value,
            satEnd: e.target.satEnd.value,
            sunStart: e.target.sunStart.value,
            sunEnd: e.target.sunEnd.value,

            startLbs: e.target.startLbs.value,
            endLbs: e.target.endLbs.value,
        };

        this.props.saveValues(data);
        this.props.nextStep();
    }
}
export default ReceivingAgencySignUp3;