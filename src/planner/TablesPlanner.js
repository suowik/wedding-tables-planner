import React, {Component} from 'react';
import shortid from 'shortid'

import Tables from './Tables.js';
import GuestList from './GuestList.js';
import EditTable from './EditTable.js';
import ManageGuests from './ManageGuests.js';
import PrintView from './PrintView.js';
import globals from '../common/globals.js'
import auth from '../auth/auth.js'
import request from 'request'
import ComplexGuestManagement from './ComplexGuestManagement.js'


let API_URL = globals['API_URL'];


class App extends Component {

    componentDidMount() {
        let loggedUser = auth.loggedUser();
        let token = loggedUser.token;
        let weddingId = loggedUser.weddingId;
        if (weddingId) {
            let requestData = {
                method: 'get',
                headers: {'x-access-token': token},
                json: true,
                url: API_URL + '/weddings/' + weddingId
            };
            let that = this;
            request(requestData, (err, res, state) => {
                let guests = state.guests.map(g => {
                    if (g.rsvp === undefined) g.rsvp = "maybe";
                    if (g.invited === undefined) g.invited = false;
                    return g
                });

                that.setState(state)
            })
        }

    }

    constructor(props) {
        super(props);
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

    updateWedding = () => {
        let loggedUser = auth.loggedUser();
        let token = loggedUser.token;
        let requestData = {
            method: 'post',
            headers: {'x-access-token': token},
            json: true,
            body: this.state,
            url: API_URL + '/weddings/update'
        };
        request(requestData, (err, res, body) => {
            loggedUser.weddingId = body._id
        })
    };

    addGuestsHandler = (rawGuests, type) => {
        let newGuests = rawGuests.map(g => {
            return {id: shortid.generate(), name: g, type: type, table: "", invited: false, rsvp: "maybe"}
        });
        let guests = this.state.guests;
        guests = guests.filter(g => g.type !== type);
        newGuests.forEach(g => guests.push(g));
        this.setState({
            guests: guests,
            tables: this.initialTablesSetup(guests, this.state.width)
        })
    };

    closeEditMode = () => {
        this.setState({
            editMode: {
                active: false,
                table: {label: "", guests: []},
            }
        })
    };

    editHandler = (tableId) => {
        let table = this.state.tables.filter(t => t.id === tableId)[0];
        this.setState({
            editMode: {
                active: true,
                table: table
            }
        })
    };

    initialTablesSetup = (guests, width) => {
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

    assignGuestToTable = (guest, tableId) => {
        this.findGuestAcrossTablesAndRemoveIt(guest);
        let tables = this.state.tables;
        if (tableId !== "---") {
            tables.forEach(t => {
                if (t.id === parseInt(tableId, 0)) {
                    if (t.guests.length < 12) {
                        guest.table = tableId;
                        t.guests.push(guest)
                    }
                }
            })

        }

        this.setState({
            tables: tables
        });
    };

    handleRemove = (guest) => {
        let tables = this.state.tables;
        tables.forEach(t => {
            let guests = t.guests;
            t.guests = guests.filter(g => g.id !== guest.id);
        });
        let guests = this.state.guests;
        guests.forEach(g => {
            if (g.id === guest.id) {
                g.table = ""
            }
        });
        this.setState({
            tables: tables,
            guests: guests
        })
    };

    findGuestAcrossTablesAndRemoveIt = (guest) => {
        this.state.tables.forEach(t => {
            let guests = t.guests;
            t.guests = guests.filter(g => g.id !== guest.id);
            guest.table = ""
        });
    };

    reorderGuestsAtTable = (tableId, guests) => {
        let tables = this.state.tables;
        tables.forEach(t => {
            if (t.id === tableId) {
                t.guests = guests
            }
        });
        this.setState({
            tables: tables
        })
    };

    moveTable = (tableId, newX, newY) => {
        let tables = this.state.tables;
        tables.forEach(t => {
            if (t.id === tableId) {
                t.x = newX;
                t.y = newY
            }
        });
        this.setState({
            tables: tables
        })
    };

    editTableName = (tableId, newLabel) => {
        let tables = this.state.tables;
        tables.forEach(t => {
            if (t.id === tableId) {
                t.label = newLabel
            }
        });
        let editMode = this.state.editMode;
        editMode.table.label = newLabel;
        this.setState({
            tables: tables,
            editMode: editMode
        })
    };

    invite = (guestId, invited) => {
        this.withGuest(guestId, (_guest) => _guest.invited = invited);
    };

    rsvp = (guestId, rsvp) => {
        this.withGuest(guestId, (_guest) => _guest.rsvp = rsvp);
    };
    withGuest = (guestId, cb) => {
        let guests = this.state.guests;
        let found = guests.filter(g => g.id === guestId);
        if (found.length === 1) {
            let guest = found[0];
            cb(guest);
            this.setState({
                guests: guests
            })
        }
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <ManageGuests guests={this.state.guests} addGuestsHandler={this.addGuestsHandler}/>
                        <ComplexGuestManagement guests={this.state.guests} invite={this.invite} rsvp={this.rsvp}/>
                        <PrintView tables={this.state.tables}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3">
                        <button className="btn btn-primary" onClick={this.updateWedding}>Zapisz układ</button>

                        <GuestList guests={this.state.guests}
                                   assignGuestToTable={this.assignGuestToTable}
                                   tables={this.state.tables}/>

                        <EditTable editMode={this.state.editMode}
                                   guests={this.state.guests}
                                   tables={this.state.tables}
                                   assignGuestToTable={this.assignGuestToTable}
                                   closeEditMode={this.closeEditMode}
                                   reorderGuestsAtTable={this.reorderGuestsAtTable}
                                   editTableName={this.editTableName}
                                   handleRemove={this.handleRemove}
                        />
                    </div>
                    <div className="col-lg-9">
                        <Tables guests={this.state.guests}
                                tables={this.state.tables}
                                width={this.state.width}
                                height={this.state.height}
                                editHandler={this.editHandler}
                                moveHandler={this.moveTable}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
