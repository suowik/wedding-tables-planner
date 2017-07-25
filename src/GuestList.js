import React, {Component} from 'react';

export default class GuestList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: "",
            tables: props.tables.map(e => {
                return {id: e.id, label: "Stół " + (e.id + 1)}
            })
        };
        this.assignGuestToTable = this.assignGuestToTable.bind(this);
        this.filter = this.filter.bind(this);
    }

    filter(e) {
        e.preventDefault();
        let searchString = e.target.value.toLowerCase();
        this.setState({
            filter: searchString
        })
    }

    assignGuestToTable(guest) {
        return (e) => {
            e.preventDefault();
            this.props.assignGuestToTable(guest, e.target.value)
        }
    }

    render() {
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="filter">Wyszukaj:</label>
                    <input id="filter"
                           type="text"
                           value={this.state.filter}
                           className="form-control"
                           onChange={this.filter}
                    />
                </div>
                <ul>
                    {this.props.guests.filter(g => g.id.toLowerCase().indexOf(this.state.filter) !== -1).map((guest) => {
                        return <li key={guest.id}>{guest.id}
                            <select onChange={this.assignGuestToTable(guest)} value={guest.table}>
                                <option value={"---"}>---</option>
                                {this.props.tables.map(table =>
                                    <option key={guest.id + table.id}
                                            value={table.id}>{table.label}</option>)}
                            </select>
                        </li>
                    })}
                </ul>
            </div>
        )
    }
}