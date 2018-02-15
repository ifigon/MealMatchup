import React, { Component } from 'react';
import './FoodLogsContainer.css';
import FoodLogItem from './FoodLogItem'

class FoodLogsContainer extends Component {
    render(){
        return(
            <div className="food-container">
                <FoodLogItem 
                    date={"10/23/2018"} 
                    time={"2:45 pm"} 
                    daName={"Local Point"}
                    daPhone={"324-324-2948"}
                    daManager={"Andrea Benson"}
                    daSigned={"3:20 pm"}
                    daEmail={"AndreaBenson@gmail.com"}
                    raName={"Union Gospel Mission"}
                    raPhone={"206-372-4899"}
                    raSigned={"John Smith"}
                    raTime={"3:40 pm"}
                    raEmail={"John-Smith@gmail.com"}
                    freezerTemp={"30 F"}
                    freezerTime={"2:00 pm"}
                    notes={"This week we were able to donate so much food due to this new system!"}
                    pickedUpName={"Green Greeks"}
                    stuName1={"Joyce Huang"}
                    stuPhone1={"425-403-9483"}
                    stuEmail1={"joyce@gmail.com"}
                    stuName2={"James MacDonald"}
                    stuPhone2={"206-323-1900"}
                    stuEmail2={"James@gmail.com"}
                    donationItem={"Beans"}
                    donationWeight={"12 lbs"}
                ></FoodLogItem>
                <FoodLogItem 
                    date={"2/14/2018"} 
                    time={"9:00 am"} 
                    daName={"Local Point"}
                    daPhone={"324-324-2948"}
                    daManager={"Andrea Benson"}
                    daSigned={"3:20 pm"}
                    daEmail={"AndreaBenson@gmail.com"}
                    raName={"Union Gospel Mission"}
                    raPhone={"206-372-4899"}
                    raSigned={"John Smith"}
                    raTime={"3:40 pm"}
                    raEmail={"John-Smith@gmail.com"}
                    freezerTemp={"30 F"}
                    freezerTime={"2:00 pm"}
                    notes={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut lobortis mi. Aliquam a imperdiet orci."}
                    stuName1={"Joyce Huang"}
                    stuPhone1={"425-403-9483"}
                    stuEmail1={"joyce@gmail.com"}
                    stuName2={"James MacDonald"}
                    stuPhone2={"206-323-1900"}
                    stuEmail2={"James@gmail.com"}
                ></FoodLogItem>
                <FoodLogItem 
                    date={"3/2/2017"} 
                    time={"4:45 pm"} 
                    daName={"Local Point"}
                    daPhone={"324-324-2948"}
                    daManager={"Andrea Benson"}
                    daSigned={"3:20 pm"}
                    daEmail={"AndreaBenson@gmail.com"}
                    raName={"Union Gospel Mission"}
                    raPhone={"206-372-4899"}
                    raSigned={"John Smith"}
                    raTime={"3:40 pm"}
                    raEmail={"John-Smith@gmail.com"}
                    freezerTemp={"30 F"}
                    freezerTime={"2:00 pm"}
                    notes={"This week we were able to donate so much food due to this new system!"}
                    pickedUpName={"Green Greeks"}
                    stuName1={"Joyce Huang"}
                    stuPhone1={"425-403-9483"}
                    stuEmail1={"joyce@gmail.com"}
                    stuName2={"James MacDonald"}
                    stuPhone2={"206-323-1900"}
                    stuEmail2={"James@gmail.com"}
                ></FoodLogItem>
            </div>
        )
    }
}

export default FoodLogsContainer;