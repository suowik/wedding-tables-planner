import React, {Component} from 'react';
import {Button, Modal} from "react-bootstrap";

export default class PrintView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false
        };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }

    close() {
        this.setState({
            active: false
        })
    }

    open() {
        this.setState({
            active: true
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    {this.props.tables.map(table => {
                        return <table key={table.id} className="table table-striped">
                            <thead>
                            <th>{table.label}</th>
                            </thead>
                            <tbody>
                            {table.guests.map(guest => <tr key={guest.id}>
                                <td>{guest.name}</td>
                            </tr>)}
                            </tbody>
                        </table>
                    })}
                </div>
            </div>
        )
    }
}