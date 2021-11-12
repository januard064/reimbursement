import { BrowserRouter as Router, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import Register from '../Register';
import Login from '../Login';
import Dashboard from '../Dashboard';
import Header from '../../../component/moleculs/Header';
import EmployeeMenu from '../EmployeeMenu';
import { store } from '../../../config/redux';


function App() {
    return (
     <Provider store={store}>
        <Router>
            <div className="App">
                <Header />
              
                      <Switch>
                        {/* <Route exact path="/register" component={Register} /> */}
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route exact path="/employee" component={EmployeeMenu} />
                        <Redirect to="/login" />
                    </Switch>
                   
            </div>
        </Router>
     </Provider>
    );
  }
  
  export default App;