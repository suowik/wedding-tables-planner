import React, {Component} from 'react';
import Filter from './Filter.js'

class Guests extends Component {
    constructor(props) {
        super(props);
        this.assignGuestToTable = this.assignGuestToTable.bind(this);
    }

    render() {
        return (
            <div style={{overflow: 'auto', height: '400px'}}>
                <table className="table table-striped">
                    <tbody>
                    {this.props.filtered.map((guest) => {
                        let className = guest.table !== "" ? "success" : "danger";
                        return <tr key={guest.id} className={className}>
                            <td>{guest.name}</td>
                            <td>
                                <select onChange={this.assignGuestToTable(guest)} value={guest.table} className="form-control">
                                    <option value={"---"}>---</option>
                                    {this.props.tables.map(table =>
                                        <option key={guest.id + table.id}
                                                value={table.id}>{table.label}</option>)}
                                </select>
                            </td>
                        </tr>
                    })}
                    </tbody>
                </table>
            </div>
        )
    }

    assignGuestToTable(guest) {
        return (e) => {
            e.preventDefault();
            this.props.assignGuestToTable(guest, e.target.value)
        }
    }
}

export default class GuestList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tables: props.tables.map(e => {
                return {id: e.id, label: e.label}
            })
        };
    }


    render() {
        return (
            <Filter editMode={this.props.editMode}
                    guests={this.props.guests}
                    tables={this.props.tables}
                    assignGuestToTable={this.props.assignGuestToTable}
                    guestsRepesentation={Guests}/>
        )
    }
}