import React from 'react';
import './header.css';

class Header extends React.Component {

    constructor(props) {
        super(props)
    }

    logout = ()=>{
       window.localStorage.removeItem('token')
       window.location.href = '/login'
    }

    componentWillMount() { }

    render() {
        return (
            <div className="header center p20">
                <h1>Apertumo</h1>
                <span onClick={this.logout}>Logout</span>
            </div>
        )
    }

}

export default Header;
