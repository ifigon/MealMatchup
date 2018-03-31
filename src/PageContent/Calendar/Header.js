import React, {Component} from 'react';
import Previous from '../../icons/Previous.svg'
import Next from '../../icons/Next.svg'
import moment from 'moment'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            month: null,
            diff: 0,
            fDay: null,
            lDay: null
            
        };
        this.nextMonth = this.nextMonth.bind(this);
        this.prevMonth = this.prevMonth.bind(this);
    }

    componentWillMount() {
        this.setState({ month: moment().format('MMMM') });
    }

    nextMonth(e) {
        e.preventDefault();
        this.setState({diff: this.state.diff+1})
        var nMonth = moment().add(this.state.diff,'months').format('MMMM');
        this.setState({month:nMonth});
    }

    prevMonth(e) {
        e.preventDefault();
        this.setState({diff: this.state.diff-1})
        var pMonth = moment().add(this.state.diff,'months').format('MMMM');
        this.setState({month:pMonth});
    }

    render() {
        return (
            <div style={{marginTop: '120px', marginLeft:'250px'}} id="calHeader">
                <div id="monPrev" onClick={this.prevMonth}>
                    <img alt="icon" type="image/svg+xml" src={Previous} className="user-icon"/>
                </div>
                <div id="monName">{this.state.month}</div>
                <div id="monNext" onClick={this.nextMonth}>
                    <img alt="icon" type="image/svg+xml" src={Next} className="user-icon"/>
                </div>
            </div>
        );
    }
}

export default Header;