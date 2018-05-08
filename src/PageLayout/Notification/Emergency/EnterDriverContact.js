import React, { Component } from 'react';
import { StringFormat } from '../../../Enums.js';
import { formatPhone } from '../../../utils/Utils';

class EnterDriverContact extends Component {
    saveInfo(e) {
        e.preventDefault();
        let fields = {
            name: e.target.primaryName.value,
            email: e.target.primaryEmail.value,
            phone: e.target.primaryPhone.value
        };

        this.props.saveDriverInfo(fields);
    }
    render() {
        return (
            <div className="modal-wrapper-contact">
                <h1>Driver Information</h1>
                <form
                    className="primary-contact"
                    onSubmit={this.saveInfo.bind(this)}
                >
                    <input
                        name="primaryName"
                        type="text"
                        id="primaryName"
                        className="form-component"
                        placeholder="Name"
                        required
                    />
                    <input
                        name="primaryEmail"
                        type="email"
                        id="primaryEmail"
                        className="form-component"
                        placeholder="Email"
                        required
                    />
                    <input
                        name="primaryPhone"
                        onChange={formatPhone}
                        type="tel"
                        pattern={StringFormat.PHONE}
                        className="form-component"
                        placeholder="555-555-5555"
                        id="primaryPhone"
                        required
                    />
                    <div className="popup-buttons">
                        <button className="claim" type="submit">
                            Next
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
export default EnterDriverContact;
