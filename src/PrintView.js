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
            <div className="col-lg-6">
                <button className="btn btn-block btn-default" onClick={this.open}>Spis stołów i gości</button>
                <Modal show={this.state.active} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Spis stołów i gości</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container-fluid">
                            <div className="row">
                                {this.props.tables.map(table => {
                                    return <table className="table table-bordered">
                                        <thead>
                                        <th>{table.label}</th>
                                        </thead>
                                        <tbody>
                                        {table.guests.map(guest => <tr><td>{guest.name}</td></tr>)}
                                        </tbody>
                                    </table>
                                })}
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}