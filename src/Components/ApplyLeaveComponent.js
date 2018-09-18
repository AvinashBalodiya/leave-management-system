import React,{ Component} from 'react';
import { connect } from 'react-redux';

class ApplyLeaveComponent extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            user_id:this.props.user.email,
            description:'',
            toDate:'',
            fromDate:'',
            type:'',
            id:this.props.leaves.length+1,
            status:'pending'
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({id:nextProps.leaves.length+1});
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        this.props.applyLeave(this.state);
        event.preventDefault();
    }

    render(){
        return<form onSubmit={this.handleSubmit} className="form-horizontal">
                <div className="form-group">
                    <label htmlFor="leaveType" className="col-sm-3">Leave Type:</label>
                    <div className="col-sm-9">
                        <select className="form-control" required id="leaveType" name="type"
                             onChange={this.handleChange} value={this.state.type}>
                            <option value="" disabled>Select leave Type</option>
                            <option value="sick">Sick</option>
                            <option value="casual">Casual</option>
                            <option value="earn">Earn</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="toDate" className="col-sm-3">To Date:</label>
                    <div className="col-sm-9">
                        <input type="date" value={this.state.toDate}
                            required 
                            name="toDate"
                            onChange={this.handleChange}
                            placeholder="To Date"
                            className="form-control" id="toDate"/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="fromDate" className="col-sm-3">From Date:</label>
                    <div className="col-sm-9">
                        <input type="date" value={this.state.fromDate}
                            required
                            name="fromDate"
                            onChange={this.handleChange} 
                            placeholder="From Date" 
                            className="form-control" 
                            id="fromDate"/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-9">
                        <textarea className="form-control" 
                            rows="5"
                            required
                            name="description" 
                            value={this.state.description} 
                            onChange={this.handleChange} 
                            placeholder="Description"/>
                    </div>
                </div>
                <button className="btn btn-default">Submit</button>
        </form>
    }
}
const mapStateToProps = state => {
    return {
        user:state.user,
        leaves:state.leaves
    }
}

const mapDispatchToProps = dispatch => {
    return {
        applyLeave: (leave) =>
            dispatch({
                type: 'APPLY_LEAVE',
                payload:leave
            })
    }
}
 export default connect(mapStateToProps, mapDispatchToProps)(ApplyLeaveComponent);
