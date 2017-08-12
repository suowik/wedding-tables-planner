import React, {Component} from 'react';
import {Button, Modal} from "react-bootstrap";

export default class GenericModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    open = (e) => {
        e.preventDefault();
        this.setState({
            open: true
        });
    };

    close = () => {
        this.setState({
            open: false
        });
    };


    render(){
        return (
            <div className="col-lg-6">
                <button className="btn btn-block btn-primary" onClick={this.open}>Podgląd gości</button>
                <Modal show={this.state.open} onHide={this.close} dialogClassName="full-width-modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Zarządzaj gośćmi</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.props.children}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Zamknij</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

}