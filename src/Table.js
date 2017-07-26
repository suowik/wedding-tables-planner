import React, {Component} from 'react';
import {Circle, Text, Group} from 'react-konva'
import TableTooltip from './TableTooltip.js'

export default class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: 'grey',
            radius: 30,
            tooltip: {
                visible: false,
                x: 0,
                y: 0
            }
        };
        this.onDragEnd = this.onDragEnd.bind(this);
        this.showTooltip = this.showTooltip.bind(this);
        this.hideTooltip = this.hideTooltip.bind(this);
        this.coordsOfGuest = this.coordsOfGuest.bind(this);
        this.handleEdit = this.handleEdit.bind(this)
    }

    handleEdit() {
        this.props.editHandler(this.props.id)
    }

    onDragEnd(e) {
        this.props.moveHandler(this.props.id, e.evt.layerX, e.evt.layerY)
    }

    showTooltip() {
        this.setState({
            tooltip: {
                visible: true,
                x: this.props.x,
                y: this.props.y,
            }
        })
    }

    hideTooltip() {
        this.setState({
            tooltip: {
                visible: false,
                x: 0,
                y: 0
            }
        })
    }

    coordsOfGuest(i) {
        let rotation = i === 0 ? 0 : Math.PI / 180 * (i * 36);
        let point = {x: 0, y: 30};
        let center = {x: this.props.x, y: this.props.y};
        let smallCircleCoords = {x: center.x + point.x, y: center.y + point.y};
        let afterRotation = {
            x: (smallCircleCoords.x - center.x) * Math.cos(rotation) + (smallCircleCoords.y - center.y) * Math.sin(rotation) + center.x,
            y: Math.abs((smallCircleCoords.x - center.x) * Math.sin(rotation) - (smallCircleCoords.y - center.y) * Math.cos(rotation) + center.y)
        };
        return {x: parseInt(afterRotation.x, 0), y: parseInt(afterRotation.y, 0)};
    };

    render() {
        return (
            <Group>
                <Circle
                    x={this.props.x}
                    y={this.props.y}
                    radius={this.state.radius}
                    fill={this.state.color}
                    onClick={this.handleEdit}
                    onDragEnd={this.onDragEnd}
                    onMouseEnter={this.showTooltip}
                    onMouseOut={this.hideTooltip}
                    onDragStart={this.hideTooltip}
                    stroke={"black"}
                    strokeWidth={1}
                    draggable={true}
                />
                {this.props.guests.map((e, i) => {
                    let coords = this.coordsOfGuest(i);
                    return <Circle
                        key={coords.y + coords.x}
                        x={coords.x}
                        y={coords.y}
                        radius={6}
                        fill={'blue'}
                        stroke={"black"}
                        strokeWidth={1}
                    />
                })}
                <Text
                    x={this.props.x - 17}
                    y={this.props.y - 5}
                    width={40}
                    height={30}
                    fontSize={8}
                    padding={0}
                    fill={"#fff"}
                    text={this.props.label}
                />
                {this.state.tooltip.visible && this.props.guests.length > 0 &&
                <TableTooltip x={this.state.tooltip.x} y={this.state.tooltip.y} guests={this.props.guests}/>}
            </Group>
        );
    }
}