import React, {Component} from 'react';
import Tables from './Tables.js';
import GuestList from './GuestList.js';
import EditTable from './EditTable.js';
import ManageGuests from './ManageGuests.js'

class App extends Component {

    constructor(props) {
        super(props);
        console.log(window.location.search)
        this.initialTablesSetup = this.initialTablesSetup.bind(this);
        this.assignGuestToTable = this.assignGuestToTable.bind(this);
        this.pasteStateHandler = this.pasteStateHandler.bind(this);
        this.findGuestAcrossTablesAndRemoveIt = this.findGuestAcrossTablesAndRemoveIt.bind(this);
        this.closeEditMode = this.closeEditMode.bind(this);
        this.editHandler = this.editHandler.bind(this);
        this.addGuestsHandler = this.addGuestsHandler.bind(this);
        let width = 900;
        let height = 600;
        let guests = [];
        let tables = this.initialTablesSetup(guests, width);
        this.state = {
            guests: guests,
            width: width,
            height: height,
            tables: tables,
            editMode: {
                active: false,
                allGuests: guests,
                table: {label: "", guests: []}
            }
        }
    }

    addGuestsHandler(rawGuests, type) {
        let newGuests = rawGuests.map(g => {
            return {id: g, type: type, table: ""}
        });
        let guests = this.state.guests;
        guests = guests.filter(g => g.type !== type);
        newGuests.forEach(g => guests.push(g));
        this.setState({
            guests: guests,
            tables: this.initialTablesSetup(guests, this.state.width)
        })
    }

    closeEditMode() {
        this.setState({
            editMode: {
                active: false,
                allGuests: this.state.guests,
                table: {label: "", guests: []},
            }
        })
    }

    editHandler(tableId) {
        let table = this.state.tables.filter(t => t.id === tableId)[0];
        this.setState({
            editMode: {
                active: true,
                allGuests: this.state.guests,
                table: table
            }
        })
    }

    initialTablesSetup(guests, width) {
        let x = 0;
        let rows = 0;
        let current = 0;
        let tableCapacity = 10;
        let tableCount = Math.ceil(guests.length / tableCapacity);
        let tableWidth = 160;
        let maxTablesHorizontally = (width / tableWidth) - 1;
        return [...new Array(tableCount)].fill(1).map((e, i) => {
            if (current > maxTablesHorizontally) {
                x = tableWidth / 2;
                rows += 1;
                current = 1;
            } else {
                x = current * tableWidth + (tableWidth / 2);
                current += 1;
            }
            let y = rows * tableWidth + tableWidth;
            return {id: i, x: x, y: y, guests: [], label: "Stół " + (i + 1)}
        });
    };

    assignGuestToTable(guest, tableId) {
        this.findGuestAcrossTablesAndRemoveIt(guest);
        let tables = this.state.tables;
        if (tableId !== "---") {
            let table = tables[tableId];
            guest.table = tableId;
            if (table.guests.length < 10) {
                table.guests.push(guest)
            }
        }

        this.setState({
            tables: tables,
        });
    }

    findGuestAcrossTablesAndRemoveIt(guest) {
        this.state.tables.forEach(t => {
            let guests = t.guests;
            let indexOf = guests.indexOf(guest);
            let found = indexOf !== -1;
            if (found) {
                guests.splice(indexOf, 1)
            }
            guest.table = ""
        })
    }

    pasteStateHandler(e) {
        e.preventDefault();
        let pasted = e.clipboardData.getData('text/plain');
        let newState = JSON.parse(Buffer.from(pasted, 'base64').toString());
        this.setState(newState);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <ManageGuests guests={this.state.guests} addGuestsHandler={this.addGuestsHandler}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="form-group">
                            <label htmlFor="filter">Skopiuj stan:</label>
                            <textarea id="filter"
                                      type="text"
                                      value={new Buffer(JSON.stringify(this.state)).toString('base64')}
                                      className="form-control"
                                      onPaste={this.pasteStateHandler}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3">
                        <GuestList guests={this.state.guests}
                                   assignGuestToTable={this.assignGuestToTable}
                                   tables={this.state.tables}/>
                        <EditTable editMode={this.state.editMode}
                                   assignGuestToTable={this.assignGuestToTable}
                                   closeEditMode={this.closeEditMode}/>
                    </div>
                    <div className="col-lg-9">
                        <Tables guests={this.state.guests}
                                tables={this.state.tables}
                                width={this.state.width}
                                height={this.state.height}
                                editHandler={this.editHandler}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
