import React, {Component} from 'react';
import Tables from './Tables.js';
import GuestList from './GuestList.js';
import EditTable from './EditTable.js';


class App extends Component {

    constructor(props) {
        super(props);
        this.initialTablesSetup = this.initialTablesSetup.bind(this);
        this.assignGuestToTable = this.assignGuestToTable.bind(this);
        this.refreshState = this.refreshState.bind(this);
        this.findGuestAcrossTablesAndRemoveIt = this.findGuestAcrossTablesAndRemoveIt.bind(this);
        this.closeEditMode = this.closeEditMode.bind(this);
        this.editHandler = this.editHandler.bind(this);
        let width = 900;
        let height = 700;
        let guests = ["Klaudia Zachara",
            "Paweł Słowik",
            "Anna Zachara",
            "Robert Zachara",
            "Natalia Zachara",
            "Tomasz Koźlak",
            "Maria Łanocha",
            "Fryderyk Łanocha",
            "Elżbieta Łanocha",
            "Jadwiga Sarlej",
            "Juliusz Sarlej",
            "Justyna Sarlej",
            "Józef Sarlej",
            "Marta Kozłowska",
            "Dariusz Kozłowski",
            "Karol Sarlej",
            "Maria Mleczko",
            "Halina Bączek",
            "Wiesław Bączek",
            "Robert Bączek",
            "Ewa Bączek",
            "Aleksandra Bączek (50%)",
            "Magdalena Pytlarz",
            "Maciej Pytlarz",
            "Julia Pytlarz (50%)",
            "Jakub Bączek",
            "Maria Zachara",
            "Magdalena Zachara",
            "Osoba towarzysząca",
            "Bernadetta Klimek",
            "Mirosław Klimek",
            "Agnieszka Klimek",
            "Osoba towarzysząca",
            "Bartłomiej Klimek ",
            "Osoba towarzysząca",
            "Tomasz Klimek",
            "Osoba towarzysząca",
            "Tadeusz Sułkowski",
            "Jadwiga Sułkowska",
            "Karolina Sułkowska",
            "Osoba towarzysząca",
            "Izabela Zmysło",
            "Ireneusz Zmysło",
            "Wojciech Zmysło (50%)",
            "Jakub Zmysło",
            "Karol Sułkowski",
            "Maria Sułkowska",
            "Agata Babicz",
            "Piotr Babicz",
            "Blanka Babicz (50%)",
            "Andrzej Węglarz",
            "Dorota Węglarz",
            "Filip Węglarz",
            "Osoba towarzysząca",
            "Nina Węglarz",
            "Osoba towarzysząca",
            "Beata Gicala",
            "Andrzej Gicala",
            "Alicja Gicala (50%)",
            "Joanna Maksylewicz",
            "Osoba towarzysząca",
            "Jakub Żurek",
            "Osoba towarzysząca",
            "Gabriela Żurek ",
            "Osoba towarzysząca",
            "Wojciech Pawłowski",
            "Marta Adamczyk",
            "Maciej Adamczyk",
            "Michalina Górnisiewicz",
            "Jakub Tota",
            "Łukasz Babicz",
            "Osoba towarzysząca",
            "Anna Puczkowska",
            "Maciej Puczkowski",
            "Joanna Tabiś",
            "Tomasz Tabiś",
            "Michał Kossakowski",
            "Dominika Panek",
            "Renata Siębor",
            "Piotr Siębor",
            "Hubert Zapiór",
            "Ewa Prus",
            "Michał Ropek",
            "Kinga Ropek",
            "Basia Sora",
            "Aleksander Chełmecki",
            "Kinga Jarosz",
            "Grzegorz Jarosz",
            "Beata Woźniak",
            "Franciszek Woźniak",
            "Maria Porębska",
            "Piotr Porębski",
            "Bogusława Słowik",
            "Piotr Słowik??????",
            "Barbara Kuryj",
            "Maciej Kuryj",
            "Magdalena Kuryj",
            "Krzysztof Bodek",
            "Genowefa Gołąb",
            "Józef Gołąb",
            "Paweł Gołąb",
            "Agnieszka Gołąb",
            "Zuzanna Gołąb",
            "Franciszek Gołąb (50%)",
            "Piotr Gołąb",
            "Katarzyna Gołąb",
            "Dorota Mocek",
            "Marcin Mocek",
            "Dominika Mocek",
            "Osoba towarzysząca",
            "Bartosz Mocek",
            "Joanna Gołąb/Pepri",
            "Gabriel Pepri",
            "Wiktor Pepri (50%)",
            "Teresa Niklewicz",
            "Andrzej Niklewicz",
            "Magdalena Lechwar",
            "Leszek Lechwar",
            "Krzysztof Niklewicz",
            "Osoba towarzysząca",
            "Halina Mamroł",
            "Henryk Mamroł",
            "Zofia Słowik",
            "Andrzej Rączka",
            "Barbara Rączka",
            "Piotr Wilisowski",
            "Osoba towarzysząca",
            "Aleksander Malawski",
            "Osoba towarzysząca",
            "Marcin Walczyk",
            "Anna Walczyk",
            "Marcin Sendyka",
            "Osoba towarzysząca",
            "Mateusz Zając",
            "Helena Oleksy",
            "Michał Sala",
            "Osoba towarzysząca",
            "Paweł Gaik",
            "Natalia Brajner",
            "Agnieszka Lasyk",
            "Maciej Lasyk",
            "Krystian Jarmicki",
            "Agnieszka Krystiana",
            "Michał Jaeschke",
            "Anna Jaeschke",
            "Trio z Rio",
            "Trio z Rio",
            "Kamerzysta",
            "Fotograf",
            "Ksiądz"
        ];
        let tables = this.initialTablesSetup(guests, width);
        this.state = {
            guests: guests,
            width: width,
            height: height,
            tables: tables,
            state: "",
            editMode: {
                active: false,
                allGuests: guests,
                table: {label: "", guests: []}
            }
        }
    }

    closeEditMode(){
        this.setState({
            editMode: {
                active: false,
                allGuests: this.state.guests,
                table: {label: "", guests: []},
            }
        })
    }

    editHandler(tableId) {
        let table = this.state.tables.filter(t=> t.id === tableId)[0];
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
            if (table.guests.length < 10) {
                table.guests.push(guest)
            }
        }
        this.setState({
            tables: tables,
            state: new Buffer(JSON.stringify(this.state)).toString('base64')
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
        })
    }

    refreshState(e) {
        e.preventDefault();
        let pasted = e.clipboardData.getData('text/plain');
        let newState = JSON.parse(Buffer.from(pasted, 'base64').toString());
        this.setState({
            guests: newState.guests,
            tables: newState.tables,
            state: pasted
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="form-group">
                            <label htmlFor="filter">Skopiuj stan:</label>
                            <textarea id="filter"
                                      type="text"
                                      value={this.state.state}
                                      className="form-control"
                                      onPaste={this.refreshState}
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
