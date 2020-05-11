import React from 'react';
import './users.css';
import Api from '../../HOC/api';
import UserCard from '../../Components/user-card/user-card';
import { connect } from 'react-redux';
import { userList } from '../../Actions/action'
import { Switch } from 'react-router-dom';


const symbol = {
    0: '>',
    1: '>=',
    2: '==',
    3: '<=',
    4: '<',
}

const label = {
    age: 'Age',
    nameLength: 'Full name length'
}


class Users extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            showFilter: false,
            users: [],
            filter: [{ 'label': 0, 'symbol': 0, 'value': 1 }],
        }

    }

    getUsers = () => {
        Api.get('/users').then(res => {
            this.props.userList(res.data)
        }).catch(err => {
            window.location.href = '/login'
        })
    }


    showFilter = () => {
        this.setState({ showFilter: true })
    }

    addFilter = () => {
        const filter = this.state.filter;
        filter.push({ 'label': 0, 'symbol': 0, 'value': 1 });
        this.setState({
            filter: filter
        })
    }

    removeFilter = (index) => {
        if (this.state.filter.length === 1) {
            this.setState({ showFilter: false, users:this.state.copy })
        } else {
            const filter = this.state.filter;
            filter.splice(index, 1)
            this.setState({ filter: filter })
        }

    }

    applyFilter = () => {
        this.setState({ users: this.state.copy }, () => {
            let users = this.state.users;
            const labels = Object.keys(label)
            const sym = Object.values(symbol)
            this.state.filter.forEach(res => {
                users = users.filter((user) => {
                    switch (sym[res.symbol]) {
                        case '>':
                            return user[labels[res.label]] > res.value
                        case '>=':
                            return user[labels[res.label]] >= res.value
                        case '<':
                            return user[labels[res.label]] < res.value
                        case '<=':
                            return user[labels[res.label]] <= res.value
                        case '==':
                            return user[labels[res.label]] == res.value
                    }

                })
            })
            this.setState({ users: users })
        })

    }

    handleChange = ($event, index) => {
        $event.persist()
        const filter = this.state.filter
        filter[index][$event.target.id] = $event.target.value
        this.setState({ filter: filter })
        console.log(this.state.filter)
    }

    componentWillMount() {
        this.getUsers()
    }

    componentDidUpdate(prevProps) {
        if (this.props.users !== prevProps.users) {
            const users = this.props.users.map(res => Object.assign({ nameLength: res.firstName.length + res.lastName.length }, res));
            this.setState({
                users: users,
                copy: users,
                isLoading: false
            })
        }
    }


    render() {
        const fg = this.state.filter.map((res, index) => {
            return (
                <div className="filter-group flex" key={index}>
                    <select id="label" value={res.label} onChange={($event) => this.handleChange($event, index)}>
                        {Object.values(label).map((res, index) => { return (<option value={index} key={index}>{res}</option>) })}
                    </select>
                    <select id="symbol" value={res.symbol} onChange={($event) => this.handleChange($event, index)}>
                        {Object.values(symbol).map((res, index) => { return (<option value={index} key={index}>{res}</option>) })}
                    </select>
                    <input id="value" type="number" min="1" value={res.value} onChange={($event) => this.handleChange($event, index)} />
                    <button onClick={() => this.removeFilter(index)}> - </button>
                    <button onClick={this.addFilter}> + </button>
                </div>
            )
        })

        return (
            <div className="page-wrapper p20">
                <div className="users-page">
                    <header>
                        <h2>Users</h2>
                        <span onClick={this.showFilter}>Filter</span>
                    </header>
                    {this.state.isLoading && <div className="users-list">
                        Loading...
                    </div>}
                    {this.state.showFilter && <div className="filter">
                        {fg}
                        <div className="right"><button className="primary" onClick={this.applyFilter}>Apply</button></div>
                    </div>}

                    {!this.state.isLoading && <div className="users-list">
                        {this.state.users.map((res, index) => <UserCard user={res} key={index} />)}
                    </div>}
                    {!this.state.isLoading &&  !this.state.users.length && <div className="users-list">
                        <p>No users found.</p>
                    </div>}
                    <footer>
                        View source code on <a target="_blank" href="/">github</a>
                    </footer>
                </div>
            </div>
        )
    }

}


function mapDispatchToProps(dispatch) {
    return {
        userList: users => dispatch(userList(users)),
    }
}

function mapStateToProps(state) {
    return { ...state.users }
}


export default connect(mapStateToProps, mapDispatchToProps)(Users);
