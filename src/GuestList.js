import React, {Component} from 'react';

export default class GuestList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: "",
            type: "all",
            tables: props.tables.map(e => {
                return {id: e.id, label: e.label}
            })
        };
        this.assignGuestToTable = this.assignGuestToTable.bind(this);
        this.filter = this.filter.bind(this);
        this.changeSearchType = this.changeSearchType.bind(this)
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

    changeSearchType(e) {
        e.preventDefault();
        let type = e.target.value;
        this.setState({
            type: type
        })
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
                <div className="form-group">
                    <label htmlFor="type">Rodzaj gościa:</label>
                    <select id="type"
                            type="text"
                            value={this.state.type}
                            className="form-control"
                            onChange={this.changeSearchType}>
                        <option value={"groom-friends"}>Znajomi Młodego</option>
                        <option value={"bride-friends"}>Znajomi Młodej</option>
                        <option value={"bride-family"}>Rodzina Młodej</option>
                        <option value={"groom-family"}>Rodzina Młodego</option>
                        <option value={"others"}>Inni</option>
                        <option value={"all"}>---</option>
                    </select>
                </div>
                <div style={{overflow: 'auto', height: '400px'}}>
                    <table className="table table-striped">
                        <tbody>
                        {this.props.guests.filter(g => {
                            let type;
                            if (this.state.type !== "all") {
                                type = g.type === this.state.type;
                            } else {
                                type = true
                            }
                            return type && g.id.toLowerCase().indexOf(this.state.filter) !== -1
                        }).map((guest) => {
                            let className = guest.table !== "" ? "success" : "danger";
                            return <tr key={guest.id} className={className}>
                                <td>{guest.id}</td>
                                <td><select onChange={this.assignGuestToTable(guest)} value={guest.table}>
                                    <option value={"---"}>---</option>
                                    {this.props.tables.map(table =>
                                        <option key={guest.id + table.id}
                                                value={table.id}>{table.label}</option>)}
                                </select></td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}