import React, {Component} from 'react';
import {Stage, Layer, Rect} from 'react-konva'
import Table from './Table.js'

export default class Tables extends Component {

    render() {
        return (
            <Stage width={this.props.width} height={this.props.height}>
                <Layer>
                    <Rect strokeWidth={1} stroke={"black"} x={0} y={0} width={this.props.width - 4}
                          height={this.props.height - 4}/>
                    {this.props.tables.map(i => {
                        return <Table key={i.id}
                                      x={i.x}
                                      y={i.y}
                                      id={i.id}
                                      label={i.label}
                                      guests={i.guests}
                                      moveHandler={this.props.moveHandler}
                                      editHandler={this.props.editHandler}
                        />
                    })}
                </Layer>
            </Stage>
        )
    }
}