import React, {Component} from 'react';

class TableComponent extends Component {
    constructor(props){
        super(props);
        this.handleApproveClick = this.handleApproveClick.bind(this);
        this.handleRejectClick = this.handleRejectClick.bind(this);
    }

    handleApproveClick(event, id){
        if(this.props.onChange) {
            this.props.onChange(event, {
                'id':id,
                'type':'approve'
            });
        }
    }

    handleRejectClick(event, id){
        if(this.props.onChange) {
            this.props.onChange(event, {
                'id':id,
                'type':'reject'
            });
        }
    }

    render(){
        const columns = (
            <tr>
                <th>User</th>
                <th>Type</th>
                <th>From</th>
                <th>To</th>
                <th>Description</th>
                { this.props.showActions && this.props.forAdmin ? <th>Actions</th> : null }
            </tr>
        );
        const coloumnsData = (
            <tbody>
                {this.props.columnsData.length ? this.props.columnsData.map((c,key) => 
                    <tr key={key}>
                        <td>{c.user_id}</td>
                        <td>{c.type}</td>
                        <td>{c.fromDate}</td>
                        <td>{c.toDate}</td>
                        <td>{c.description}</td>  
                        { this.props.showActions && this.props.forAdmin ?
                            <td>
                                <button className="btn btn-sm btn-success" style={{marginRight:"6px"}} 
                                    onClick={e =>this.handleApproveClick(e, c.id)} type="button">
                                    Approve
                                </button>
                                <button className="btn btn-sm btn-danger" 
                                    onClick={e => this.handleRejectClick(e, c.id)} type="button">
                                    Reject
                                </button>
                            </td> : null 
                        }
                    </tr>)
                    : (<tr>
                        <td colSpan="6" style={{fontSize:"15px"}}>No Leaves found</td>
                    </tr>)
                }
            </tbody>
        );
        return (
            <div className="row" style={{marginTop:"5px"}}>
                <div className="col-sm-12">
                <table className="table table-bordered table-striped">
                    <thead>
                        {columns}
                    </thead>
                    {coloumnsData}
                </table>
                </div>
            </div>
        )
    }
}

TableComponent.defaultProps = {
    forAdmin:false,
    showActions:false
};

export  default TableComponent;