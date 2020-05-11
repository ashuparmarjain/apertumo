import React from 'react';
import './user-card.css';


const bgColor = ['#f32626', '#eee', '#ec4141', '#f3aa26', '#b7f326', '#26f3e0', '#2678f3', '#f326da']

export default class UserCard extends React.Component {

    constructor(props) {
        super(props)
    }


    componentWillMount() { }

    render() {
        return (
            <div className="user-card">
                <ul className="flex">
                    <li>
                        <div className="avatar" style={{backgroundColor:bgColor[Math.floor(Math.random() * bgColor.length)]}}>
                            <span className="absolute-center"> {this.props.user.firstName[0]}{this.props.user.lastName[0]} </span>
                        </div>
                    </li>
                    <li>
                        <h3>{this.props.user.firstName} {this.props.user.lastName}</h3>
                        <p>Age <strong>{this.props.user.age}</strong></p>
                    </li>
                </ul>
            </div>
        )
    }

}
