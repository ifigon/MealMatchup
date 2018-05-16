import React, { Component } from 'react';
import {DeliveryStatus} from '../../Enums.js';
import {StringFormat} from '../../Enums.js';
import moment from 'moment';

class AssignOption extends Component {
    getButton(status, deliverers) {
        if (status === DeliveryStatus.COMPLETED) {
            return (<button disabled className="form-button already-completed-button" id={this.props.deliveryId}>Completed</button>);
        } else if (!deliverers || deliverers.length === 0) {
            return (<button type="button" className="form-button confirm-button-assign" id={this.props.deliveryId} onClick={this.props.handleEditClick}>Assign Volunteers</button>);
        } else {
            return (<button type="button" className="form-button confirm-button" id={this.props.deliveryId} onClick={this.props.handleEditClick}>Edit</button>);
        }
    }

    render() {
        const {
            deliverers,
            receivingAgency,
            startTimestamp,
            status,
        } = this.props.delivery;

        let startMoment = moment(startTimestamp);
        let date = startMoment.format(StringFormat.WEEKDAY_WITH_DATE);
        return (
            <div className="avi-row">
                <div className="container avi-details-container">
                    <div className="avi-detail">
                        {date} Pick-up 
                    </div>
                    <div className="avi-detail">
                        {receivingAgency.name}
                    </div>
                    <div className="avi-detail avi-volunteers">
                        {
                            (deliverers && deliverers.map((deliverer, index) => {
                                return <h5 key={index}>{deliverer.name}</h5>;
                            }))
                        }
                    </div>
                    <div className="avi-detail avi-volunteers">
                        {this.getButton(status, deliverers)}
                        
                    </div>
                    
                    <div className="avi-detail avi-volunteers">
                        {deliverers && deliverers.length === 2 && 
                            <button type="button" 
                                className="form-button copy" 
                                id={this.props.deliveryId} 
                                onClick={this.copyLinkToClipboard.bind(this)}
                                onMouseEnter={this.recopyDialog.bind(this)}>Copy link</button>
                        }
                    </div>
                </div>
            </div>
        );
    }



    copyLinkToClipboard(e,f) {
        // stolen from https://stackoverflow.com/a/30810322
        var textArea = document.createElement('textarea');

        //
        // *** This styling is an extra step which is likely not required. ***
        //
        // Why is it here? To ensure:
        // 1. the element is able to have focus and selection.
        // 2. if element was to flash render it has minimal visual impact.
        // 3. less flakyness with selection and copying which **might** occur if
        //    the textarea element is not visible.
        //
        // The likelihood is the element won't even render, not even a flash,
        // so some of these are just precautions. However in IE the element
        // is visible whilst the popup box asking the user for permission for
        // the web page to copy to the clipboard.
        //

        // Place in top-left corner of screen regardless of scroll position.
        textArea.style.position = 'fixed';
        textArea.style.top = 0;
        textArea.style.left = 0;

        // Ensure it has a small width and height. Setting to 1px / 1em
        // doesn't work as this gives a negative w/h on some browsers.
        textArea.style.width = '2em';
        textArea.style.height = '2em';

        // We don't need padding, reducing the size if it does flash render.
        textArea.style.padding = 0;

        // Clean up any borders.
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';

        // Avoid flash of white box if rendered for any reason.
        textArea.style.background = 'transparent';


        textArea.value = `${window.location.origin}/mobile/delivery/${this.props.deliveryId}`;

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            var successful = document.execCommand('copy');
        } catch (err) {
            console.log('Oops, unable to copy');
        }

        document.body.removeChild(textArea);

        // update button text to show that it's been copied
        e.target.className = 'form-button copy copied'; 
        e.target.innerHTML = 'Link copied to clipboard';
    }

    recopyDialog(e, f) {
        if (e.target.classList.contains('copied')) {
            e.target.innerHTML = 'Copy link again';
            e.target.onmouseleave = (e) => e.target.innerHTML = 'Link copied to clipboard';
        }
    }
}

export default AssignOption;