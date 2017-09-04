import React, {Component} from 'react';
import GenericModal from '../common/GenericModal.js'
import _ from 'lodash'
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
            filter: {type: "all", expected: ""},
            filters: {
                family: (guest, type) => guest.type === type,
                table: (guest, table) => guest.table.toString() === table,
                rsvp: (guest, rsvp) => guest.rsvp === rsvp,
                invited: (guest, invited) => guest.invited === JSON.parse(invited),
                all: (guest, all) => true
            }
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
        let [type, expected] = e.target.value.split(":");
        this.setState({
            filter: {type: type, expected: expected || ""}
        })
    };

    invite = (guestId) => {
        return (e) => {
            e.preventDefault();
            const invited = e.target.checked;
            this.props.invite(guestId, invited)
        }
    };

    rsvp = (guestId) => {
        return (e) => {
            e.preventDefault();
            const invited = e.target.value;
            this.props.rsvp(guestId, invited)
        }
    };


    render() {
        return (
            <GenericModal label="Zarządzanie gośćmi">
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
                                <option value={"all:all"}>---</option>
                                <optgroup label="Rodzina:">
                                    <option value={"family:groom-friends"}>Znajomi Młodego</option>
                                    <option value={"family:bride-friends"}>Znajomi Młodej</option>
                                    <option value={"family:bride-family"}>Rodzina Młodej</option>
                                    <option value={"family:groom-family"}>Rodzina Młodego</option>
                                    <option value={"family:others"}>Inni</option>
                                </optgroup>
                                <option value={"table:"}>Bez stołu</option>
                                <optgroup label="RSVP">
                                    <option value={"rsvp:yes"}>Potwierdził przybycie</option>
                                    <option value={"rsvp:no"}>Nie przyjdzie</option>
                                    <option value={"rsvp:maybe"}>Niezdecydowany</option>
                                </optgroup>
                                <optgroup label="Zaproszeni">
                                    <option value={"invited:true"}>Zaproszony</option>
                                    <option value={"invited:false"}>Niezaproszony</option>
                                </optgroup>
                            </select>
                        </th>
                    </tr>
                    <tr>
                        <th>Lp.</th>
                        <th>Gość</th>
                        <th>Rodzaj</th>
                        <th>Wysłane zaproszenie</th>
                        <th>RSVP?</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.guests
                        .filter(g => {
                            let filter = _.get(this.state.filters, this.state.filter.type);
                            return filter(g, this.state.filter.expected) && g.name.toLowerCase().indexOf(this.state.phrase.toLowerCase()) !== -1
                        })
                        .map((g, i) =>
                            <tr key={g.id}>
                                <td>{i + 1}.</td>
                                <td>{g.name}</td>
                                <td><GuestType type={g.type}/></td>
                                <td><input
                                    type="checkbox"
                                    className="form-control"
                                    checked={g.invited}
                                    onChange={this.invite(g.id)}/>
                                </td>
                                <td>
                                    <select
                                        className="form-control"
                                        value={g.rsvp}
                                        onChange={this.rsvp(g.id)}>
                                        <option value={"yes"}>Tak</option>
                                        <option value={"no"}>Nie</option>
                                        <option value={"maybe"}>Niewiadomo</option>
                                    </select>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </GenericModal>
        )
    }
}