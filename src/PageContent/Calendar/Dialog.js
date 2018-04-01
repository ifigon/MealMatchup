import React, { Component } from 'react';

class Dialog extends Component {
    render() {
        return (
            <dialog open>
                hello <button onClick={this.props.closeDialog}>close</button>
            </dialog>
        );
    }
}
export default Dialog;
