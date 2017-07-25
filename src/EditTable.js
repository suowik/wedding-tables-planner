import React, {Component} from 'react';
import {Button, Modal} from "react-bootstrap";
import { Draggable, Droppable } from 'react-drag-and-drop'

export default class EditTable extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.close = this.close.bind(this);
        this.onDrop = this.onDrop.bind(this)
    }

    close() {
        this.props.closeEditMode()
    }

    onDrop(data) {
        this.props.assignGuestToTable(data.guest,this.props.editMode.table.id)
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
                            <ul>
                                {this.props.editMode.allGuests.map(g => <Draggable key={g} type="guest" data={g}><li>{g}</li></Draggable>)}
                            </ul>
                        </div>
                        <div className="col-lg-6">
                            <h4>Przypisani goście</h4>
                            <Droppable
                                types={['guest']}
                                onDrop={this.onDrop}>
                                <ul className="Smoothie">
                                    {this.props.editMode.table.guests.map(g => <li key={g} value={g}>{g}</li>)}
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