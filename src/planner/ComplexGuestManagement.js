import React, {Component} from 'react';
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
        this.props.handleTypeChange(e.target.value);
        this.setState({
            type: e.target.value
        })
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
                <option value={"others"}>Inni</option>
            </select>
        )
    }
}

class AddGuestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            type: "groom-friends"
        }
    }

    addGuest = (e) => {
        e.preventDefault();
        this.props.addGuestHandler({name: this.state.name, type: this.state.type})
    };

    render() {
        return (
            <form className="form-inline">
                <div className="form-group">
                    <label htmlFor="name">Imię i nazwisko: </label>
                    <input type="text" value={this.state.name} id="name" className="form-control"
                           onChange={(e) => this.setState({name: e.target.value})}/>
                </div>
                <div className="form-group">
                    <GuestType handleTypeChange={(type) => this.setState({type: type})} type={this.state.type}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={this.addGuest}>Dodaj gościa</button>
            </form>
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

    delete = (guest) => {
        return (e) => {
            e.preventDefault();
            this.props.deleteHandler(guest)
        }
    };


    render() {
        return (
            <div className="container">
                <div className="row">
                    <AddGuestForm addGuestHandler={this.props.addGuestHandler}/>
                </div>
                <div className="row">
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
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                        <tr>
                            <th>Lp.</th>
                            <th>Gość</th>
                            <th>Rodzaj</th>
                            <th>Wysłane zaproszenie</th>
                            <th>RSVP?</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.guests
                            .filter(g => {
                                let filter = _.get(this.state.filters, this.state.filter.type);
                                return filter(g, this.state.filter.expected) && g.name.toLowerCase().indexOf(this.state.phrase.toLowerCase()) !== -1
                            })
                            .map((guest, i) =>
                                <tr key={guest.id}>
                                    <td>{i + 1}.</td>
                                    <td>{guest.name}</td>
                                    <td><GuestType type={guest.type} handleTypeChange={_.noop}/></td>
                                    <td><input
                                        type="checkbox"
                                        className="form-control"
                                        checked={guest.invited}
                                        onChange={this.invite(guest.id)}/>
                                    </td>
                                    <td>
                                        <select
                                            className="form-control"
                                            value={guest.rsvp}
                                            onChange={this.rsvp(guest.id)}>
                                            <option value={"yes"}>Tak</option>
                                            <option value={"no"}>Nie</option>
                                            <option value={"maybe"}>Niewiadomo</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger" onClick={this.delete(guest)}>Usuń</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}