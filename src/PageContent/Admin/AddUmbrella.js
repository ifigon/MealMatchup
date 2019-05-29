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
                    <input name="name" type="text" className="umbrella-name-form" placeholder="Umbrella Name" required /><br />
                    <button type="submit" className="umbrella-form-submit">Add</button>
                </form>
            </div>
        )
    }
}

export default AddUmbrella;