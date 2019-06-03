import React, { Component } from 'react';
import './AddUmbrella.css'
import {umbrellasRef} from '../../FirebaseConfig';


class AddUmbrella extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: ""
        }

        this.createUmbrella = this.createUmbrella.bind(this);
    }

    createUmbrella(e) {
        e.preventDefault();
        let newUmbrellaName = e.target.name.value;
        let newUmbrella = { name : newUmbrellaName };
        umbrellasRef
            .push(newUmbrella)
            .then((snap) => {
                this.setState({ response : `Success! ${newUmbrellaName} has been added.`})
            })    
            .catch(error => {
                this.setState({ response : error})
            }); 
    }

    render() {
        return(
            <div className="form">
                {this.state.response &&
                    <div className="umbrella-response">{this.state.response}</div>
                }
                <form id={this.formId} onSubmit={this.createUmbrella}>
                    <div className="umbrella-descriptor">Umbrella Name</div>
                    <input name="name" type="text" className="umbrella-name-form" placeholder="University of Washington" required /><br />
                    <div className="umbrella-descriptor">Umbrella Account Email</div>
                    <input name="email" type="text" className="umbrella-name-form" placeholder="uwadmin@uw.edu" required /><br />
                    <div className="umbrella-descriptor">Password</div>
                    <input name="password" type="password" className="umbrella-name-form" required /><br />                
                    <div className="umbrella-descriptor">Confirm Password</div>
                    <input name="confirmpass" type="password" className="umbrella-name-form" required /><br />                
                    <button type="submit" className="umbrella-form-submit">Add</button>
                </form>
            </div>
        )
    }
}

export default AddUmbrella;