import React, {Component} from 'react';
import {Circle, Text, Group} from 'react-konva'
import TableTooltip from './TableTooltip.js'

export default class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: 'grey',
            x: props.x,
            y: props.y,
            radius: 30,
            guests: props.guests,
            tooltip: {
                visible: false,
                x: 0,
                y: 0
            }
        };
        this.showTooltip = this.showTooltip.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.hideTooltip = this.hideTooltip.bind(this);
        this.coordsOfGuest = this.coordsOfGuest.bind(this)
    }

    onDragEnd(e) {
        this.setState({
            x: e.evt.layerX,
            y: e.evt.layerY
        })
    }

    showTooltip() {
        this.setState({
            tooltip: {
                visible: true,
                x: this.state.x,
                y: this.state.y,
                guests: this.state.guests
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
        let center = {x: this.state.x, y: this.state.y};
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
                    x={this.state.x}
                    y={this.state.y}
                    radius={this.state.radius}
                    fill={this.state.color}
                    onClick={this.showTooltip}
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
                    x={this.state.x - 17}
                    y={this.state.y - 5}
                    width={50}
                    height={10}
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