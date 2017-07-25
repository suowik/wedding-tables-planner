import React, {Component} from 'react';


export default class Filter extends Component {

    constructor(props){
        super(props);
        this.state = {
            searchPhrase: "",
            type: "all"
        };
        this.filter = this.filter.bind(this);
        this.changeSearchType = this.changeSearchType.bind(this)
    }

    filter(e) {
        e.preventDefault();
        let searchString = e.target.value.toLowerCase();
        this.setState({
            searchPhrase: searchString
        })
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
                           value={this.state.searchPhrase}
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
                <this.props.guestsRepesentation
                    tables={this.props.tables}
                    assignGuestToTable={this.props.assignGuestToTable}
                    filtered={this.props.guests
                        .filter(g => {
                            let type;
                            if (this.state.type !== "all") {
                                type = g.type === this.state.type;
                            } else {
                                type = true
                            }
                            return type && g.name.toLowerCase().indexOf(this.state.searchPhrase.toLowerCase()) !== -1
                        })}/>
            </div>
        )
    }

}