import React, { Component } from 'react'
import truck from "../../icons/truck.svg";

let ReactDOM = require('react-dom');

class ReceivingAgencySignUp3 extends Component {
    constructor(props) {
        super(props);
        this.nextStep = this.nextStep.bind(this);
    }

    render() {
        // let amWeight = this.state.am_font_weight;
        // let pmWeight = this.state.pm_font_weight;
        return (
            <div className="signup-content">
                <div className="form-block">
                    <label className="form-component delivery">Delivery Days</label>
                    <div className="row"> <input className="checkbox" type="checkbox" /><div className="day">Mon</div>
                        <div className="time-input-wrapper">
                            <div className="input-wrapper">
                                <input ref="monStart" className="week" type="text" />
                                <div className="am-pm">
                                    <span className="am">AM</span>
                                    /
                                <span className="PM">PM</span>
                                </div>
                            </div>
                            to
                     <div className="input-wrapper">
                                <input ref="monEnd" type="text" className="week" /><div className="am-pm">
                                    <span className="am">AM</span>
                                    /
                                <span className="PM">PM</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />

                    <div className="row"> <input  ref="tueStart" className="checkbox" type="checkbox" /><div className="day">Tue</div>
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
                                <input ref="tueEnd" type="text" className="week" /><div className="am-pm">
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
                                <input ref="wedStart" className="week" type="text" />
                                <div className="am-pm">
                                    <span className="am">AM</span>
                                    /
                                <span className="PM">PM</span>
                                </div>
                            </div>
                            to
                     <div className="input-wrapper">
                                <input ref="wedEnd" type="text" className="week" /><div className="am-pm">
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
                                <input ref="thurStart" className="week" type="text" />
                                <div className="am-pm">
                                    <span className="am">AM</span>
                                    /
                                <span className="PM">PM</span>
                                </div>
                            </div>
                            to
                     <div className="input-wrapper">
                                <input ref="thurEnd" type="text" className="week" /><div className="am-pm">
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
                                <input ref="friStart" className="week" type="text" />
                                <div className="am-pm">
                                    <span className="am">AM</span>
                                    /
                                <span className="PM">PM</span>
                                </div>
                            </div>
                            to
                     <div className="input-wrapper">
                                <input ref="friEnd" type="text" className="week" /><div className="am-pm">
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
                                <input ref="satStart" className="week" type="text" />
                                <div className="am-pm">
                                    <span className="am">AM</span>
                                    /
                                <span className="PM">PM</span>
                                </div>
                            </div>
                            to
                     <div className="input-wrapper">
                                <input ref="satEnd" type="text" className="week" /><div className="am-pm">
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
                                <input ref="sunStart" className="week" type="text" />
                                <div className="am-pm">
                                    <span className="am">AM</span>
                                    /
                                <span className="PM">PM</span>
                                </div>
                            </div>
                            to
                     <div className="input-wrapper">
                                <input ref="sunEnd" type="text" className="week" /><div className="am-pm">
                                    <span className="am">AM</span>
                                    /
                                <span className="PM">PM</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />

                    <div className="emergency-pickup">
                        <label className="emergency-pickup-label">Emergency Pick Up Available</label><img alt="icon" className="icon" src={truck} type="image/svg+xml"/><br />
                        <input type="checkbox" className="checkbox" /><p className="pickup-p">Pick up food from donating agency, if notified, in cases of emergency.</p>
                    </div>
                    <div className="food-weight">
                        Amount of food preferred: <br /><div className="lbs-wrapper lbs-wrapper1">
                            <input type="text" className="lbs" ref="startLbs" /> <i>lbs</i></div> to <div className="lbs-wrapper lbs-wrapper2"><input ref="endLbs" type="text" className="lbs" /> <i>lbs</i></div>
                    </div>
                </div>

                <div className="buttons">
                    <span className="cancel" onClick={this.props.previousStep}>CANCEL</span>
                    <span className="next" onClick={this.nextStep}>NEXT</span>
                </div>
            </div>
        )
    }
    nextStep(e) {
        e.preventDefault()

                // Get values via this.refs
                var data = {
                    monStart: ReactDOM.findDOMNode(this.refs.monStart).value,
                    monEnd: ReactDOM.findDOMNode(this.refs.monEnd).value,
                    tueStart: ReactDOM.findDOMNode(this.refs.tueStart).value,
                    tueEnd: ReactDOM.findDOMNode(this.refs.tueEnd).value,                  
                    wedStart: ReactDOM.findDOMNode(this.refs.wedStart).value,
                    wedEnd: ReactDOM.findDOMNode(this.refs.wedEnd).value,     
                    thurStart: ReactDOM.findDOMNode(this.refs.thurStart).value,
                    thurEnd: ReactDOM.findDOMNode(this.refs.thurEnd).value,     
                    friStart: ReactDOM.findDOMNode(this.refs.friStart).value,
                    friEnd: ReactDOM.findDOMNode(this.refs.friEnd).value,     
                    satStart: ReactDOM.findDOMNode(this.refs.satStart).value,
                    satEnd: ReactDOM.findDOMNode(this.refs.satEnd).value,     
                    sunStart: ReactDOM.findDOMNode(this.refs.sunStart).value,
                    sunEnd: ReactDOM.findDOMNode(this.refs.sunEnd).value,     
 

                    startLbs: ReactDOM.findDOMNode(this.refs.startLbs).value,
                    endLbs: ReactDOM.findDOMNode(this.refs.endLbs).value,

                }
        
                this.props.saveValues(data)
                this.props.nextStep()
    }
}
export default ReceivingAgencySignUp3;