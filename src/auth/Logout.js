import React, {Component} from "react";
import auth from './auth.js'

class Logout extends Component {

    componentDidMount() {
        auth.logout()
    }

    render() {
        return <p>Zostałeś wylogowany</p>
    }
}

export default Logout