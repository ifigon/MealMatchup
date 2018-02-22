import React, { Component } from 'react';
import DirectoryCard from './DirectoryCard.js';
import DirectoryFilter from './DirectoryFilter.js';
import './Directory.css';
import "typeface-roboto";

// Component for directory card

class DirectoryPage extends Component {

    render() {
		return (
            <div className="directoryPage">
                {/* TODO: For now, I'll keep the filter component separate
                            but I think I will move it to the Directory Page so that it will be easier
                            to grab the filter query and use it to display the directory cards below */}
                <DirectoryFilter />
                <DirectoryCard 
                    organization='Local Point University of Washington'
                    logo='https://www.washington.edu/brand/files/2014/09/W-Logo_Purple_Hex.png' 
                    address1='123 Seasame St.'
                    address2='Seattle, WA 98115' 
                    contactName='Amy Powell'
                    contactTitle='Program Coordinator' 
                    contactNumber='206-487-2859'
                    contactEmail='amypowell@gmail.com' />
            </div>
		);
  }
}

export default DirectoryPage;