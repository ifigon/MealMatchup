import React, { Component } from 'react';
import './FoodLogsContainer.css';
import FoodLogItem from './FoodLogItem';
import arrow from '../../icons/filter_arrow.svg';

class FoodLogsContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            foodLogs: [
                {
                    date: '10/23/2018',
                    startTime: '13:00',
                    daName: 'Local Point',
                    daPhone: '324-324-2948',
                    daManager: 'Andrea Benson',
                    daSigned: '3:20 pm',
                    daEmail: 'AndreaBenson@gmail.com',
                    raName: 'Union Gospel Mission',
                    raPhone: '206-372-4899',
                    raSigned: 'John Smith',
                    raTime: '3:40 pm',
                    raEmail: 'John-Smith@gmail.com',
                    freezerTemp: '30 F',
                    freezerTime: '2:00 pm',
                    notes: 'This week we were able to donate so much food due to this new system!',
                    pickedUpName: 'Green Greeks',
                    stuName1: 'Joyce Huang',
                    stuPhone1: '425-403-9483',
                    stuEmail1: 'joyce@gmail.com',
                    stuName2: 'James MacDonald',
                    stuPhone2: '206-323-1900',
                    stuEmail2: 'James@gmail.com',
                    donations: [
                        {
                            item: 'rice',
                            weight: '2 lbs'
                        }
                    ]
                },
                {
                    date: '10/23/2018',
                    startTime: '13:00',
                    daName: 'Local Point',
                    daPhone: '324-324-2948',
                    daManager: 'Andrea Benson',
                    daSigned: '3:20 pm',
                    daEmail: 'AndreaBenson@gmail.com',
                    raName: 'Union Gospel Mission',
                    raPhone: '206-372-4899',
                    raSigned: 'John Smith',
                    raTime: '3:40 pm',
                    raEmail: 'John-Smith@gmail.com',
                    freezerTemp: '30 F',
                    freezerTime: '2:00 pm',
                    notes: 'This week we were able to donate so much food due to this new system!',
                    pickedUpName: 'Green Greeks',
                    stuName1: 'Joyce Huang',
                    stuPhone1: '425-403-9483',
                    stuEmail1: 'joyce@gmail.com',
                    stuName2: 'James MacDonald',
                    stuPhone2: '206-323-1900',
                    stuEmail2: 'James@gmail.com',
                    donations: [
                        {
                            item: 'Beans',
                            weight: '12 lbs'
                        },
                        {
                            item: 'Rice',
                            weight: '300 lbs'
                        }
                    ]
                }
            ]
        };
    }

    componentDidMount(){
        //TODO: query firebase
        this.setState({

        });
    }

    render(){
        return(
            <div className="food-container ">
                <div className="filter">
                    <p>Filter</p>
                    <div className="dropdown">
                        <span>Student Groups </span>
                        <img src={arrow} alt="arrow"></img>
                        <div className="dropdown-content">
                            <p>Green Greeks</p>
                        </div>
                    </div>
                    <div className="dropdown">
                        <span>Receiving Agency </span>
                        <img src={arrow} alt="arrow"></img>
                        <div className="dropdown-content">
                            <p>Green Greeks</p>
                        </div>
                    </div>
                </div>
                {
                    this.state.foodLogs.map((log, i) => {
                        return (
                            <FoodLogItem 
                                date={log.date} 
                                time={log.time} 
                                daName={log.daName}
                                daPhone={log.daPhone}
                                daManager={log.daManager}
                                daSigned={log.daSigned}
                                daEmail={log.daEmail}
                                raName={log.raName}
                                raPhone={log.raPhone}
                                raSigned={log.raSigned}
                                raTime={log.raTime}
                                raEmail={log.raEmail}
                                freezerTemp={log.freezerTemp}
                                freezerTime={log.freezerTime}
                                notes={log.notes}
                                pickedUpName={log.pickedUpName}
                                stuName1={log.stuName1}
                                stuPhone1={log.stuPhone1}
                                stuEmail1={log.stuEmail1}
                                stuName2={log.stuName2}
                                stuPhone2={log.stuPhone2}
                                stuEmail2={log.stuEmail2}
                                donationItem={log.donations}
                                donationWeight={log.donations}
                            ></FoodLogItem>
                        );
                    })
                }
            </div>
        );
    }
}
export default FoodLogsContainer;