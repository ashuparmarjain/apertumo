import React from 'react';
import './login.css';
import Api from '../../HOC/api';
import { connect } from 'react-redux';
import { storeToken } from '../../Actions/action'

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            password: '',
            disabled: true,
            error: false,
            isLoading: false
        }
    }

    componentDidMount() {
        if (this.props.token) {
            this.navigateToHome()
        }
    }

    handleChange = ($event) => {
        let prop = $event.target.name;
        let value = $event.target.value;
        this.setState({ [prop]: value }, () => { this.validate() })

    }

    validate = () => {
        if (this.state.id && this.state.password)
            this.setState({ disabled: false })
        else
            this.setState({ disabled: true })
    }

    login = () => {
        this.setState({ isLoading: true }, () => {
            let data = {
                'accountId': this.state.id,
                'pswd': this.state.password
            }
            Api.public_post('/user/login', data)
                .then(res => {
                    if (res.data.token) {
                        this.props.storeToken(res.data['token'])
                        Api.setToken(res.data.token)
                        this.navigateToHome()
                    } else {
                        this.setState({
                            error: true,
                            isLoading: false
                        })
                    }
                }).catch(err => {
                    this.setState({
                        error: true,
                        isLoading: false
                    })
                }
            )
        })

    }

    navigateToHome() {
        this.props.history.push(`/`);
    }

    render() {
        return (
            <div className="page-wrapper">
                <div className="login-page relative h100">
                    <div className="login-form-block absolute-center">
                        <h1 className="center">Log in to Apertumo</h1>
                        {this.state.error && <p className="error">The user id and password that you entered did not match our records. Please double-check and try again.</p>}
                        <div className="form-field">
                            <label htmlFor="id" className="block"> User ID</label>
                            <input type="text" name="id" id="id" value={this.state.id} onChange={($event) => this.handleChange($event)} />
                        </div>
                        <div className="form-field">
                            <label htmlFor="password" className="block"> Password</label>
                            <input type="password" name="password" id="password" value={this.state.password} onChange={($event) => this.handleChange($event)} />
                        </div>
                        <div>
                            <button className="primary" onClick={this.login} disabled={this.state.disabled}> {(this.state.isLoading) ? 'Loading..' : 'Log in'} </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}


function mapDispatchToProps(dispatch) {
    return {
        storeToken: token => dispatch(storeToken(token)),
    }
}

function mapStateToProps(state) {
    return { ...state.checkForToken }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);
