import React, { Component } from 'react';
import gql from 'graphql-tag';
import{Mutation} from 'react-apollo'
import { AUTH_TOKEN } from '../constants'
export default class Login extends Component{
    constructor(props) {
        super(props);

        this.state = {
            login: true,
            email: '',
            password:''
        }
    }
    render() {
        const HELLO_QUERY = gql `mutation ($email:String!, $password:String!) { login(email:$email , password: $password){token,user{id, posts{id, title}}}}`;
        const { email, password } = this.state;
        return (
            <div>

                <input
                    type="text"
                    value={this.state.email}
                    onChange={e => {
                        this.setState({ email: e.target.value })
                    }}
                />
                <input
                    type="text"
                    value={this.state.password}
                    onChange={e => {
                        this.setState({ password: e.target.value })
                    }}
                />

                <Mutation mutation={HELLO_QUERY}  variables={{ email, password } } onCompleted={() => this._confirm()}>
                    {mutation => (
                        <button onClick={mutation}>Submit
                        </button>)}
                </Mutation>

            </div>


        )
    }
    _confirm = async data => {
        const { token } = this.state.login;
        this._saveUserData(token);
        this.props.history.push(`/user`)
    };
    _saveUserData = token => {
        localStorage.setItem(AUTH_TOKEN, token)
    }
}

