import React, {Component} from 'react';
import {Button, Modal} from "react-bootstrap";

class GuestsTextArea extends Component {

    handlePaste(type) {
        return (e) => {
            let raw = e.clipboardData.getData('text/plain');
            let guests = raw.split('\n').filter(g => g !== "");
            this.props.addGuestsHandler(guests, type)
        }
    }

    render() {
        return (
            <div className="col-lg-6">
                <div className="form-group">
                    <label>{this.props.label}</label>
                    <textarea className="form-control"
                              rows={15}
                              value={this.props.guests.filter(g => g.type === this.props.type).map(g => g.name).join("\n")}
                              onPaste={this.handlePaste(this.props.type)}/>
                </div>
            </div>
        )
    }
}

export default class ManageGuests extends Component {

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
                <button className="btn btn-block btn-primary" onClick={this.open}>Zarządzaj gośćmi</button>
                <Modal show={this.state.active} onHide={this.close} dialogClassName="full-width-modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Zarządzaj gośćmi</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container-fluid">
                            <div className="row">
                                <GuestsTextArea
                                    type={"bride-family"}
                                    label={"Rodzina Panny Młodej"}
                                    guests={this.props.guests}
                                    addGuestsHandler={this.props.addGuestsHandler}/>
                                <GuestsTextArea type={"groom-family"} label={"Rodzina Pana Młodego"}
                                                guests={this.props.guests}
                                                addGuestsHandler={this.props.addGuestsHandler}/>
                            </div>
                            <div className="row">
                                <GuestsTextArea type={"bride-friends"} label={"Znajomi Panny Młodej"}
                                                guests={this.props.guests}
                                                addGuestsHandler={this.props.addGuestsHandler}/>
                                <GuestsTextArea type={"groom-friends"} label={"Znajomi Pana Młodego"}
                                                guests={this.props.guests}
                                                addGuestsHandler={this.props.addGuestsHandler}/>
                            </div>
                            <div className="row">
                                <GuestsTextArea type={"others"} label={"Inni"} guests={this.props.guests}
                                                addGuestsHandler={this.props.addGuestsHandler}/>
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