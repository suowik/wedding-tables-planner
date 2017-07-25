import React, {Component} from 'react';
import {Button, Modal} from "react-bootstrap";
import {Draggable, Droppable} from 'react-drag-and-drop'

export default class EditTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchPhrase: "",
            type: "all"
        };
        this.close = this.close.bind(this);
        this.filter = this.filter.bind(this);
        this.onDrop = this.onDrop.bind(this);
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

    close() {
        this.props.closeEditMode()
    }

    onDrop(data) {
        let found = this.props.editMode.allGuests.filter(g => g.id === data.guest);
        this.props.assignGuestToTable(found[0], this.props.editMode.table.id)
    }

    render() {
        return (
            <Modal show={this.props.editMode.active} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.editMode.table.label}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-fluid">
                        <div className="col-lg-6">
                            <h4>Wszyscy goście</h4>
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
                            <div style={{overflow: 'auto', height: '300px'}}>
                                <ul>
                                    {this.props.editMode.allGuests
                                        .filter(g => {
                                            let type;
                                            if (this.state.type !== "all") {
                                                type = g.type === this.state.type;
                                            } else {
                                                type = true
                                            }
                                            return type && g.id.toLowerCase().indexOf(this.state.searchPhrase.toLowerCase()) !== -1
                                        })
                                        .map(g => {
                                            return <Draggable key={g.id} type="guest" data={g.id}>
                                                <li>{g.id}</li>
                                            </Draggable>
                                        })}
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <h4>Przypisani goście</h4>
                            <Droppable
                                types={['guest']}
                                onDrop={this.onDrop}>
                                <ul>
                                    {this.props.editMode.table.guests.map(g => <li key={g.id} value={g.id}>{g.id}</li>)}
                                </ul>
                            </Droppable>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}