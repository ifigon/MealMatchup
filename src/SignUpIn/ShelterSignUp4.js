import React, { Component } from 'react'
let ReactDOM = require('react-dom');

class ShelterSignUp4 extends Component {
    constructor(props){
        super(props);
        this.nextStep = this.nextStep.bind(this);
    }
    render() {
        return (
            <div className="signup-content">
                <div className="form-block">
                    <label className="form-component delivery">Delivery Days</label><br />
                    <input type="checkbox"/>Mon <input className="week" type="text"/><span className="am">AM</span>/<span className="PM">PM</span> to <input type="text" className="week" /><span className="am">AM</span>/<span className="PM">PM</span><br/>
                    <input type="checkbox"/>Tue <input type="text" className="week" /><span className="am">AM</span>/<span className="PM">PM</span> to <input type="text" className="week" /><span className="am">AM</span>/<span className="PM">PM</span><br/>
                    <input type="checkbox"/>Wed <input type="text" className="week" /><span className="am">AM</span>/<span className="PM">PM</span> to <input type="text" className="week" className="week" /><span className="am">AM</span>/<span className="PM">PM</span><br/>
                    <input type="checkbox"/>Thur <input type="text" className="week" /><span className="am">AM</span>/<span className="PM">PM</span> to <input type="text" className="week" /><span className="am">AM</span>/<span className="PM">PM</span><br/>
                    <input type="checkbox"/>Fri <input type="text" className="week" /><span className="am">AM</span>/<span className="PM">PM</span> to <input type="text" className="week" /><span className="am">AM</span>/<span className="PM">PM</span><br/>
                    <input type="checkbox"/>Sat <input type="text" className="week" /><span className="am">AM</span>/<span className="PM">PM</span> to <input type="text" className="week" /><span className="am">AM</span>/<span className="PM">PM</span><br/>
                    <input type="checkbox"/>Sun <input type="text" className="week" /><span className="am">AM</span>/<span className="PM">PM</span> to <input type="text" className="week" /><span className="am">AM</span>/<span className="PM">PM</span><br/>

                    <div className="emergency-pickup">
                    <label>Emergency Pick Up Available</label><img src="../..icons/truck.svg" alt="" height="30px"/><br/>
                    <input type="checkbox"/>Pick up food from donating agency, if notified, in cases of emergency.
                    </div>
                    <div className="food-weight">
                    Amount of food preferred <br/>
                    <input type="text"/> <i>lbs</i> to <input type="text"/> <i>lbs</i> 
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

        // Get values via this.refs
        var data = {
            memberName: ReactDOM.findDOMNode(this.refs.memberName).value,
            memberNumber: ReactDOM.findDOMNode(this.refs.memberNumber).value,
            memberEmail: ReactDOM.findDOMNode(this.refs.memberEmail).value,
            position: ReactDOM.findDOMNode(this.refs.position).value

        }

        this.props.saveValues(data)
        this.props.nextStep()
    }
}
export default ShelterSignUp4;