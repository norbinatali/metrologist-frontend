import React, {Component} from 'react';
import '../style/App.css';
import Login from "./Login";
import {Switch,Route} from 'react-router-dom'


class App extends Component {

    render() {

        return (

            <div className="App">
                <div className="App-header">
                    <Switch>
                    <Route exact path="/" component={Login} />

                    </Switch>
                </div>
            </div> )
    }
}


export default App;
