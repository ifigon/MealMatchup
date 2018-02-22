import React, { Component } from 'react'
let ReactDOM = require('react-dom');

class ShelterSignUp4 extends Component {
    constructor(props) {
        super(props);
        this.nextStep = this.nextStep.bind(this);
    }

    selectAM() {

    }
    render() {
        return (
            <div className="signup-content">
                <div className="form-block">
                    <label className="form-component delivery">Delivery Days</label>
                    <div className="row"> <input className="checkbox" type="checkbox" /><div className="day">Mon</div>
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
                                <input type="text" className="week" /><div className="am-pm">
                                    <span className="am">AM</span>
                                    /
                                <span className="PM">PM</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />

                    <div className="row"> <input className="checkbox" type="checkbox" /><div className="day">Tue</div>
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
                                <input type="text" className="week" /><div className="am-pm">
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
                                <input className="week" type="text" />
                                <div className="am-pm">
                                    <span className="am">AM</span>
                                    /
                                <span className="PM">PM</span>
                                </div>
                            </div>
                            to
                     <div className="input-wrapper">
                                <input type="text" className="week" /><div className="am-pm">
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
                                <input className="week" type="text" />
                                <div className="am-pm">
                                    <span className="am">AM</span>
                                    /
                                <span className="PM">PM</span>
                                </div>
                            </div>
                            to
                     <div className="input-wrapper">
                                <input type="text" className="week" /><div className="am-pm">
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
                                <input className="week" type="text" />
                                <div className="am-pm">
                                    <span className="am">AM</span>
                                    /
                                <span className="PM">PM</span>
                                </div>
                            </div>
                            to
                     <div className="input-wrapper">
                                <input type="text" className="week" /><div className="am-pm">
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
                                <input className="week" type="text" />
                                <div className="am-pm">
                                    <span className="am">AM</span>
                                    /
                                <span className="PM">PM</span>
                                </div>
                            </div>
                            to
                     <div className="input-wrapper">
                                <input type="text" className="week" /><div className="am-pm">
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
                                <input className="week" type="text" />
                                <div className="am-pm">
                                    <span className="am">AM</span>
                                    /
                                <span className="PM">PM</span>
                                </div>
                            </div>
                            to
                     <div className="input-wrapper">
                                <input type="text" className="week" /><div className="am-pm">
                                    <span className="am">AM</span>
                                    /
                                <span className="PM">PM</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />

                    <div className="emergency-pickup">
                        <label className="emergency-pickup-label">Emergency Pick Up Available</label><img src="../..icons/truck.svg" alt="" height="30px" /><br />
                        <input type="checkbox" className="checkbox" /><p className="pickup-p">Pick up food from donating agency, if notified, in cases of emergency.</p>
                    </div>
                    <div className="food-weight">
                        Amount of food preferred: <br /><div className="lbs-wrapper lbs-wrapper1">
                            <input type="text" className="lbs" /> <i>lbs</i></div> to <div className="lbs-wrapper lbs-wrapper2"><input type="text" className="lbs" /> <i>lbs</i></div>
                    </div>
                </div>

                <div className="buttons">
                    <span className="cancel" onClick={this.props.previousStep}>CANCEL</span>
                    <span className="next" onClick={this.nextStep}>DONE</span>
                </div>
            </div>
        )
    }
    nextStep(e) {
        e.preventDefault()
        this.props.nextStep()
    }
}
export default ShelterSignUp4;