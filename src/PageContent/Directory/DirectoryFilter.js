import React, { Component } from 'react';
import './Directory.scss';
import 'typeface-roboto';

// Component for directory filter

class DirectoryFilter extends Component {
    render() {
        return (
            <div className="filter">
                <p style={{fontSize: '24px'}}>Filter</p>
                {/* TODO: Click for a drop down menu */}
                <div className="dropDownFilter">
                    <p className='dropDownOption'>Student Group &#8964;</p>
                    <p className='dropDownOption' style={{marginLeft: '15px'}}>Receiving Agency &#8964;</p>
                </div>
            </div>
        );
    }
}

export default DirectoryFilter;