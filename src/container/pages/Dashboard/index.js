import React, { Component } from 'react';
import { CardBody, Label, CardTitle, CardText } from 'reactstrap';
import './dashboard.css';
import { addDataToFirebase } from '../../../config/redux/action';
import { connect } from 'react-redux';


class Dashboard extends Component {

    constructor(props){
        super(props);
        this.state ={
            // request_date : '',
            transaction_date: '',
            reimbursement_cost: '',
            reimbursement_status: '',
            reimbursement_title: '',
            reimbursement_desc: '',
            reimbursement_type: '',
            proof_transaction:'', 
            type_proof_transaction: '',
           
        };
    }
    

    // componentDidMount(){
    //     const userData = JSON.parse(localStorage.getItem('userData'));
    //     this.props.getData(userData.uid);
    // }

    handleTodoValue = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }



    handleSubmit = async () => {
        const { transaction_date, reimbursement_cost, reimbursement_status, reimbursement_title, reimbursement_desc, reimbursement_type, proof_transaction,type_proof_transaction  } = this.state;
        const userData = JSON.parse(localStorage.getItem('userData'));
        const data = {
            transaction_date : transaction_date,
            reimbursement_cost : reimbursement_cost,
            reimbursement_status : reimbursement_status,
            reimbursement_title : reimbursement_title,
            reimbursement_desc: reimbursement_desc,
            reimbursement_type : reimbursement_type,
            proof_transaction: proof_transaction,
            type_proof_transaction: type_proof_transaction,
            request_date: new Date().toISOString(),
            userId: userData.uid,
            employee_name: userData.email,
        }

        this.props.saveData(data); 
        const {history} = this.props;
        history.push('/employee');
        console.log('before transefer',data);

    }



    // logout = () =>{
    //     const {history} = this.props;
    //     localStorage.clear();
    //     history.push('/login')
    // }
      

    render(){
        // const { todos } = this.props;
        return(
            
            <div>
                <div className="container">
                    <div className="col-12 col-md-9 offset-md-2">
                    
                        <CardBody className="cardbody">
                            
                            <div className="row">
                                <div className="col-6">
                                      <div className="inputs">
                                        <Label>Type</Label>
                                        <select className="input"  type="text" id="reimbursement_type" onChange={this.handleTodoValue} >
                                            <option >Select Type of Reimbursement</option>
                                            <option value="Transport">Transport</option>
                                            <option value="Event">Event</option>
                                            <option value="Inventory">Inventory</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-6">
                                      <div className="inputs">
                                        <Label>Title</Label>
                                        <input className="input"  type="text" id="reimbursement_title" onChange={this.handleTodoValue} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                      <div className="inputs">
                                        <Label>Transactition Date</Label>
                                        <input className="input"  type="date" id="transaction_date" onChange={this.handleTodoValue} />
                                    </div>
                                </div>
                                <div className="col-6">
                                      <div className="inputs">
                                        <Label>Transactition Cost</Label>
                                        <input className="input"  type="text" id="reimbursement_cost" onChange={this.handleTodoValue} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                      <div className="inputs">
                                        <Label>Transactition Proof Type</Label>
                                        <input className="input"  type="text" id="type_proof_transaction" onChange={this.handleTodoValue} />
                                    </div>
                                </div>
                                <div className="col-6">
                                      <div className="inputs">
                                        <Label>Description</Label>
                                        <textarea className="input"  type="text" id="reimbursement_desc" onChange={this.handleTodoValue} />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-4">
                                      <div className="inputs">
                                        <Label>Proof of Transactition</Label>
                                        <input className="input"  type="text" id="proof_transaction" onChange={this.handleTodoValue} />
                                    </div>
                                </div>

                                <div className="col-2">
                                      <div className="">
                                        <Label></Label>
                                        <input className="inputsFile" type="file" id="myFile" name="filename" />
                                    </div>
                                </div>
                               
                            </div>
                            <div className="col-4 offset-8">
                                    <button onClick={this.handleSubmit}>Submit</button>
                            </div>          
                          
                        </CardBody>
                    </div>

                    <hr />
               
                </div> 
            
                    {/* <div>
                        <button onClick={this.logout}>Logout</button>
                    </div> */}
            </div>
            
            
        )
    }
}

const reduxState = (state) => ({
    userData: state.user,
    // todos: state.todo,

})

const reduxDispatch = (dispatch) => ({
    saveData: (data) => dispatch(addDataToFirebase(data)),
    
})

export default connect(reduxState, reduxDispatch) (Dashboard);