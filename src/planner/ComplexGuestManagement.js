import React, {Component} from 'react';
import {Button, Modal} from "react-bootstrap";
import GenericModal from '../common/GenericModal.js'

class GuestType extends Component {

    constructor(props) {
        super(props);
        this.state = {
            type: props.type
        }
    }

    handleChange = (e) => {
        e.preventDefault();
    };

    render() {
        return (
            <select id="type"
                    type="text"
                    value={this.state.type}
                    onChange={this.handleChange}
                    className="form-control">
                <option value={"groom-friends"}>Znajomi Młodego</option>
                <option value={"bride-friends"}>Znajomi Młodej</option>
                <option value={"bride-family"}>Rodzina Młodej</option>
                <option value={"groom-family"}>Rodzina Młodego</option>
                <option value={"non-assigned"}>Bez stołu</option>
                <option value={"others"}>Inni</option>
                <option value={"all"}>---</option>
            </select>
        )
    }
}


export default class ComplexGuestManagement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            phrase: "",
            type: "all"
        }
    }

    handlePhraseChange = (e) => {
        e.preventDefault();
        this.setState({
            phrase: e.target.value.toLowerCase()
        })
    };

    handleChangeType = (e) => {
        e.preventDefault();
        this.setState({
            type: e.target.value
        })
    };

    render() {
        return (
            <GenericModal>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Szukaj:</th>
                        <th><input className="form-control"
                                   type="text"
                                   value={this.state.phrase}
                                   onChange={this.handlePhraseChange}/>
                        </th>
                        <th>
                            <select id="type"
                                    type="text"
                                    value={this.state.type}
                                    className="form-control"
                                    onChange={this.handleChangeType}>
                                <option value={"groom-friends"}>Znajomi Młodego</option>
                                <option value={"bride-friends"}>Znajomi Młodej</option>
                                <option value={"bride-family"}>Rodzina Młodej</option>
                                <option value={"groom-family"}>Rodzina Młodego</option>
                                <option value={"non-assigned"}>Bez stołu</option>
                                <option value={"others"}>Inni</option>
                                <option value={"all"}>---</option>
                            </select>
                        </th>
                    </tr>
                    <tr>
                        <th>Lp.</th>
                        <th>Gość</th>
                        <th>Rodzaj</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.guests
                        .filter(g => {
                            let type;
                            if (this.state.type === "non-assigned") {
                                type = g.table.toString() === ""
                            } else if (this.state.type !== "all") {
                                type = g.type === this.state.type;
                            } else {
                                type = true
                            }
                            return type && g.name.toLowerCase().indexOf(this.state.phrase.toLowerCase()) !== -1
                        })
                        .map((g, i) =>
                            <tr key={g.id}>
                                <td>{i + 1}.</td>
                                <td>{g.name}</td>
                                <td><GuestType type={g.type}/></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </GenericModal>
        )
    }
}