import React, { Component } from 'react';

class AddUmbrella extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        console.log('hello?');
        return(
            <div className="form">
                <form id={this.formId} onSubmit={this.createRequest}>
                    <input name="name" type="text" id="name" placeholder="Umbrella Name" required /><br />

                </form>
            </div>
        )

    }
}

export default AddUmbrella;