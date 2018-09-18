import React, {Component} from 'react';
import Table from './TableComponent';
import ApplyLeaveComponent from './ApplyLeaveComponent';
import { connect } from 'react-redux';

class DashboardComponent extends Component{
    constructor(props){
        super(props);
        
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.handleAction = this.handleAction.bind(this);

        this.state = {
            leaves:this.props.leaves
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({leaves:nextProps.leaves});
    }

    handleLogoutClick() {
        let time = localStorage.getItem('lastLogin');
        if(time){
            this.props.setLastLogin(time, this.props.user.email);
            localStorage.removeItem('lastLogin');
        }
        this.props.logOut();
    }

    handleAction(event, info) {
        if(info.type==='approve'){
            this.props.approveLeave(info.id);
        } else {
            this.props.rejectLeave(info.id);
        }
    }

    render(){
        const pendingLeaves = this.state.leaves.filter((leave) => leave.status==='pending');
        const approvedLeaves = this.state.leaves.filter((leave) => leave.status==='approved');
        const userLeaves = this.state.leaves.filter((leave) => leave.user_id===this.props.user.email);

        let template = '';
        if(this.props.user.is_admin){
            template = (<div className="row">
                <div className="col-sm-7">
                    <h3 className="h3">Pending Leaves({pendingLeaves.length})</h3>
                    <Table forAdmin={true} showActions={true}
                        onChange={(e, id) => this.handleAction(e, id)} 
                        columnsData = {pendingLeaves}
                    />
                </div>
                <div className="col-sm-5">
                <h3 className="h3">Approved Leaves({approvedLeaves.length})</h3>
                    <Table forAdmin={true} columnsData={approvedLeaves}/>
                </div>
            </div>);
        } else {
            template = (<div className="row">
                <div className="col-sm-6">
                    <h3 className="h3">My Leaves</h3>   
                    <Table columnsData = {userLeaves}/>
                </div>
                <div className="col-sm-6">
                <h3 className="h3">Apply For Leave</h3>
                    <ApplyLeaveComponent/>
                </div>
            </div>);
        }
       const user = this.props.user;
        return <div className="container">
                <h3>DashBoard</h3>
                <div className="row">
                    <p>{user.last_login_at ? 'Last Login at '+user.last_login_at : ''}</p>
                    <button className="btn btn-default"type="button" style={{float:'right'}} 
                    onClick={this.handleLogoutClick}>
                        Logout
                    </button>
                </div>
                {template}
            </div>
    }
}
const mapStateToProps = (state) => {
    return {
        leaves:state.leaves, 
        user:state.user
    }
}

const mapDispatchToProps = dispatch => {
   return {
        approveLeave: (id) =>
            dispatch({
                type: 'APPROVE_LEAVE',
                payload:id
            }),
        rejectLeave: (id) =>
            dispatch({
                type: 'REJECT_LEAVE',
                payload:id
            }),
        logOut:() => {
            dispatch({
                type: 'LOG_OUT',
            })
        },
        setLastLogin:(time, email) => {
            dispatch({
                type:'SET_LAST_LOG_IN',
                payload:{
                    time:time,
                    userId:email
                }
            })
        }
        
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);
