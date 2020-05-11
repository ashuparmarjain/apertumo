
import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import Users from '../Pages/users/users';
import Header from '../Components/header/header';
import { connect } from 'react-redux';

 class PrivateRoute extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            (this.props.token) ?
                <div>
                    <Header/>
                    <Switch>
                        <Route path="/">
                            <Users />
                        </Route>
                    </Switch>
                </div> :
                <Redirect to="/login" />
        )
    }
}



function mapStateToProps(state) {
    return { ...state.checkForToken}
}


export default connect(mapStateToProps, null)(PrivateRoute);