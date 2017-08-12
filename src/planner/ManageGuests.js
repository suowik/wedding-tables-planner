import React, {Component} from 'react';
import {Button, Modal} from "react-bootstrap";
import GenericModal from '../common/GenericModal.js'

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
            <div className="col-lg-3">
                <div className="form-group">
                    <label>{this.props.label}</label>
                    <textarea className="form-control"
                              rows={11}
                              value={this.props.guests.filter(g => g.type === this.props.type).map(g => g.name).join("\n")}
                              onPaste={this.handlePaste(this.props.type)}/>
                </div>
            </div>
        )
    }
}

export default class ManageGuests extends Component {

    render() {
        return (
            <GenericModal>
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
            </GenericModal>
        )
    }
}