import React, {Component} from 'react';
import {Button, Modal} from "react-bootstrap";
import {Draggable, Droppable} from 'react-drag-and-drop'
import Filter from './Filter.js'

class TableGuestList extends Component {
    render() {
        return (
            <div style={{overflow: 'auto', height: '300px'}}>
                <ul>
                    {this.props.filtered
                        .map(g => {
                            return <Draggable key={g.id} type="guest" data={g.id}>
                                <li>{g.name}</li>
                            </Draggable>
                        })}
                </ul>
            </div>
        )
    }
}

export default class EditTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchPhrase: "",
            type: "all"
        };
        this.close = this.close.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    close() {
        this.props.closeEditMode()
    }

    onDrop(data) {
        let found = this.props.guests.filter(g => g.id === data.guest);
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
                            <Filter editMode={this.props.editMode}
                                    guests={this.props.guests}
                                    guestsRepesentation={TableGuestList}/>
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
                < Modal.Footer >
                    <Button onClick={this.close}>Close</Button>
                </Modal.Footer >
            </ Modal >
        )
    }
}