import React, {Component} from 'react';
import {Button, Modal} from "react-bootstrap";
import {Draggable, Droppable} from 'react-drag-and-drop'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';


import Filter from './Filter.js'

class TableGuestList extends Component {

    constructor(props) {
        super(props);
        this.handleDoubleClick = this.handleDoubleClick.bind(this)
    }

    handleDoubleClick(guestId) {
        return (e) => {
            e.preventDefault();
            this.props.handleDoubleClick(guestId)
        }
    }

    render() {
        return (
            <div style={{overflow: 'auto', height: '300px'}}>
                <ol>
                    {this.props.filtered
                        .map(g => {
                            return <Draggable key={g.id} type="guest" data={g.id}
                                              onDoubleClick={this.handleDoubleClick(g.id)}>
                                <li value={g.id}>{g.name}</li>
                            </Draggable>
                        })}
                </ol>
            </div>
        )
    }
}

export default class EditTable extends Component {

    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.handleDoubleClick = this.handleDoubleClick.bind(this);
        this.reorderGuests = this.reorderGuests.bind(this);
        this.editTableName = this.editTableName.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    close() {
        this.props.closeEditMode()
    }

    onDrop(data) {
        let found = this.props.guests.filter(g => g.id === data.guest);
        this.props.assignGuestToTable(found[0], this.props.editMode.table.id)
    }

    handleDoubleClick(guestId) {
        let found = this.props.guests.filter(g => g.id === guestId);
        this.props.assignGuestToTable(found[0], this.props.editMode.table.id)
    }

    reorderGuests(oldIndex, newIndex) {
        this.props.reorderGuestsAtTable(this.props.editMode.table.id, arrayMove(this.props.editMode.table.guests, oldIndex, newIndex))
    }

    editTableName(e) {
        e.preventDefault();
        this.props.editTableName(this.props.editMode.table, e.target.value)
    }

    handleRemove(guestId) {
        console.log(guestId)
        this.props.handleRemove({id:guestId})
    }

    render() {
        return (
            <Modal show={this.props.editMode.active} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <input type="text" className="form-control"
                               value={this.props.editMode.table.label}
                               onChange={this.editTableName}/>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-fluid">
                        <div className="col-lg-6">
                            <Filter editMode={this.props.editMode}
                                    guests={this.props.guests}
                                    tables={this.props.tables}
                                    assignGuestToTable={this.props.assignGuestToTable}
                                    guestsRepesentation={TableGuestList}
                                    handleDoubleClick={this.handleDoubleClick}/>
                        </div>
                        <div className="col-lg-6">
                            <h4>Przypisani goście</h4>
                            <Droppable
                                types={['guest']}
                                onDrop={this.onDrop}>
                                <SortableComponent guests={this.props.editMode.table.guests}
                                                   removeHandler={this.handleRemove}
                                                   onSortEnd={this.reorderGuests}/>
                            </Droppable>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close}>Zamknij</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

function removeGuest(guestId, handler) {
    return (e) => {
        e.preventDefault();
        handler(guestId)
    }
}

const SortableItem = SortableElement(({data}) =>

    <tr>
        <td>
            <button className="btn btn-xs btn-danger" onClick={removeGuest(data.guest.id, data.removeHandler)}>-
            </button>
        </td>
        <td value={data.guest.id}>{data.index + 1}. {data.guest.name}</td>
    </tr>
);

const SortableList = SortableContainer(({data}) => {

    return (
        <table className="table table-striped">
            <tbody>
            {data.guests.map((guest, index) => (
                <SortableItem key={guest.id} index={index}
                              data={{guest: guest, index: index, removeHandler: data.removeHandler}}/>
            ))}
            </tbody>
        </table>
    );
});

class SortableComponent extends Component {

    constructor(props) {
        super(props);
        this.onSortEnd = this.onSortEnd.bind(this)
    }

    onSortEnd({oldIndex, newIndex}) {
        this.props.onSortEnd(oldIndex, newIndex)
    }

    render() {
        return <SortableList data={{guests: this.props.guests, removeHandler: this.props.removeHandler}}
                             onSortEnd={this.onSortEnd}/>;
    }
}