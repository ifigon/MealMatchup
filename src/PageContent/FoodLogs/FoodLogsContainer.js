import React, { Component } from 'react';
import './FoodLogsContainer.css';
import FoodLogItem from './FoodLogItem';
import arrow from '../../icons/filter_arrow.svg';

class FoodLogsContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            deliveries:[
                {   
                    status: 'completed',  // Enums.DeliveryStatus
                    startTimestamp: 1521295200000,  // (ms)
                    endTimestamp: 1521302400000,  // (ms)
                    timezone: 'America/Los_Angeles',  // same as spawningDeliveryRequest's
                    isEmergency: false,
                    spawningDeliveryRequest: '-L5QoXeC_UrL5tRRED3e',
                    donatingAgency: { //uid replaced by info
                        name: 'Local Point'
                    }, 
                    daContact: { //uid replaced by info
                        email: 'andrea@uw.edu',
                        name: 'Andrea Benson',
                        phone: '206-666-6666',
                    }, 
                    delivererGroup: {
                        name: 'UW Green Greeks' //uid replace by info
                    },
                    deliverers: [
                        {
                            email: 'd1@test.com',
                            name: 'deliverer1',
                            phone: '111-111-111'
                        },
                        {
                            email: 'd2@test.com',
                            name: 'deliverer2',
                            phone: '111-111-111'
                        }
                    ],
                    description: {
                        foodItems:[
                            {
                                food: 'salad',
                                quantity: '5',
                                unit: 'lb'
                            },
                            {
                                food: 'banana',
                                quantity: '50',
                                unit: 'lb'
                            }
                        ]
                    },
                    notes: '4/9, mon x4, 1-3p, none requested',
                    raContact: {
                        email: 'refigerator@uniongospel.org',
                        name: 'Bob Vance',
                        phone: '111-222-3333',
                    },
                    receivingAgency: { //uid replaced by info
                        name: 'Seattle Union Gospel'
                    },
                    pickedUpInfo: {
                        temperature: 29,  // in F
                        signature: 'John Smith',
                        timestamp: 1523174874685
                    },
                    deliveredInfo: {
                        signature: 'Ellen Blake',
                        timestamp: 1523174892769
                    }
                }
            ]
        };
    }
    componentDidMount(){
        //TODO: [backend] query completed deliveries
    }
    render(){
        return(
            <div className="food-container ">
                {/* TODO: Filter feature */}
                {
                    this.state.deliveries.map((completedDelivery, i) => {
                        return (
                            // <FoodLogItem 
                            //     date={'10/23/2018'} 
                            //     time={'2:45 pm'} 
                            //     daName={'Local Point'}
                            //     daPhone={'324-324-2948'}
                            //     daManager={'Andrea Benson'}
                            //     daSigned={'3:20 pm'}
                            //     daEmail={'AndreaBenson@gmail.com'}
                            //     raName={'Union Gospel Mission'}
                            //     raPhone={'206-372-4899'}
                            //     raSigned={'John Smith'}
                            //     raTime={'3:40 pm'}
                            //     raEmail={'John-Smith@gmail.com'}
                            //     freezerTemp={'30 F'}
                            //     freezerTime={'2:00 pm'}
                            //     notes={'This week we were able to donate so much food due to this new system!'}
                            //     pickedUpName={'Green Greeks'}
                            //     stuName1={'Joyce Huang'}
                            //     stuPhone1={'425-403-9483'}
                            //     stuEmail1={'joyce@gmail.com'}
                            //     stuName2={'James MacDonald'}
                            //     stuPhone2={'206-323-1900'}
                            //     stuEmail2={'James@gmail.com'}
                            //     donationItem={'Beans'}
                            //     donationWeight={'12 lbs'}
                            // ></FoodLogItem>
                            <FoodLogItem delivery={completedDelivery} key={i}/>
                        );
                    })
                }
            </div>
        );
    }
}

export default FoodLogsContainer;