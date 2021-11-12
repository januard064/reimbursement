import React, { Component } from 'react';
import { CardBody, Label, Modal , CardTitle, CardText } from 'reactstrap';
import './Dashboard.css';
import { getDataFromFirebase, } from '../../../config/redux/action';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';



class EmployeeMenu extends Component {

    constructor(props){
        super(props);
        this.state ={
             request_date : '',
             transaction_date: '',
             reimbursement_cost: '',
             reimbursement_status: '',
             reimbursement_title: '',
             reimbursement_desc: '',
             reimbursement_type: '',
             proof_transaction:'', 
             type_proof_transaction: '',
             isModalOpen: false,
           
        };
    }
    
    toggleModal = () =>{
        this.setState({
            request_date : '',
            transaction_date: '',
            reimbursement_cost: '',
            reimbursement_status: '',
            reimbursement_title: '',
            reimbursement_desc: '',
            reimbursement_type: '',
            proof_transaction:'', 
            type_proof_transaction: '',
            isModalOpen: false,
        });
    }

    componentDidMount(){
        const userData = JSON.parse(localStorage.getItem('userData'));
        this.props.getData(userData.uid);
    }

    handleTodoValue = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    udpdateData =(todo) => {
        console.log(todo);
        this.setState({
            request_date : todo.data.request_date,
            transaction_date:  todo.data.transaction_date,
            reimbursement_cost:  todo.data.reimbursement_cost,
            reimbursement_status:  todo.data.reimbursement_status,
            reimbursement_title:  todo.data.reimbursement_title,
            reimbursement_desc:  todo.data.reimbursement_desc,
            reimbursement_type:  todo.data.reimbursement_type,
            proof_transaction: todo.data.proof_transaction, 
            type_proof_transaction:  todo.data.type_proof_transaction,
            isModalOpen: true,
        })
    }



    logout = () =>{
        const {history} = this.props;
        localStorage.clear();
        history.push('/login')
    }
      

    render(){
        const { datas } = this.props;
        return(
            
            <div className="container">
                <div className="col-12">

                <div className="cardbody">
                    {
                    datas.length > 0 ? (
                        <div  className="col-12" >
                            <div className="col-12 col-md-3 offset-md-9 newClaim" >
                            <button><NavLink className="links" to="/dashboard">New Claim</NavLink></button>
                            </div>
                            <table>
                               <tr>
                                <th>Type</th>
                                <th>Title</th>
                                <th>Request Date</th>
                                <th>Transaction Cost</th>
                                <th> Status</th>
                                <th>action</th>
                            </tr> 
                            </table>
                            { datas.map(todo => {
                                return (
                                    <div>
                                        <table  key={todo.id}>
                                        
                                        <tr>
                                            <td>{todo.data.reimbursement_type}</td>
                                            <td>{todo.data.reimbursement_title}</td>
                                            <td>{todo.data.request_date}</td>
                                            <td>{todo.data.reimbursement_cost}</td>
                                            <td>{todo.data.reimbursement_status}</td>
                                            <td><button onClick={() => this.udpdateData(todo)}>Detail</button></td>
                                            
                                        </tr>
                                
                                    </table>
                                    </div>
                              

                                )

                            })
                            
                            }
                            
                        </div> 
                    ): <div>Belum ada claim reimbursement_</div>  
                    }
                </div> 

                </div>



                <Modal isOpen={this.state.isModalOpen}>
         
                        
                           <div className="container" >
                               <div className="">
                               
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="inputs">
                                                <Label>Type</Label>
                                                <input disabled className="input modalbody"  type="text" id="reimbursement_type" onChange={this.handleTodoValue} value={this.state.reimbursement_type} />
                                                
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="inputs">
                                                <Label>Title</Label>
                                                <input disabled className="input modalbody"  type="text" id="reimbursement_title" onChange={this.handleTodoValue} value={this.state.reimbursement_title}  />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="inputs">
                                                <Label>Transactition Date</Label>
                                                <input disabled className="input modalbody"  type="date" id="transaction_date" onChange={this.handleTodoValue} value={this.state.transaction_date}  />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="inputs">
                                                <Label>Transactition Cost</Label>
                                                <input disabled className="input modalbody"  type="text" id="reimbursement_cost" onChange={this.handleTodoValue} value={this.state.reimbursement_cost}  />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="inputs">
                                                <Label>Transactition Proof Type</Label>
                                                <input disabled className="input modalbody"  type="text" id="type_proof_transaction" onChange={this.handleTodoValue} value={this.state.type_proof_transaction}  />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="inputs">
                                                <Label>Description</Label>
                                                <textarea disabled className="input modalbody"  type="text" id="reimbursement_desc" onChange={this.handleTodoValue} value={this.state.reimbursement_desc}  />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-4">
                                            <div className="inputs">
                                                <Label>Proof of Transactition</Label>
                                                <input disabled className="input modalbody"  type="text" id="proof_transaction" onChange={this.handleTodoValue} value={this.state.proof_transaction} />
                                            </div>
                                        </div>

                             
                               
                            </div>

                            <div className="col-3 offset-9">
                              <button onClick={this.toggleModal}>Close</button>  
                            </div>
                            </div>
                            </div>
                    
                   
                    </Modal>
            </div>
            
            
           
        )
    }
}

const reduxState = (state) => ({
    userData: state.user,
    datas: state.data,

})

const reduxDispatch = (dispatch) => ({
    getData: (data) => dispatch(getDataFromFirebase(data)),
   
})

export default connect(reduxState, reduxDispatch) (EmployeeMenu);