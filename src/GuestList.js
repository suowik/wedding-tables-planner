import React, {Component} from 'react';

export default class GuestList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: "",
            filteredGuests: props.guests,
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
            filteredGuests: this.props.guests.filter(g => g.toLowerCase().indexOf(searchString) !== -1),
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
                    {this.state.filteredGuests.map((e, i) => {
                        return <li key={i}>{e} <select onChange={this.assignGuestToTable(e)}>
                            <option value={"---"}>---</option>
                            {this.state.tables.map(e2 => <option key={e + e2.id} value={e2.id}>{e2.label}</option>)}
                        </select>
                        </li>
                    })}
                </ul>
            </div>
        )
    }
}