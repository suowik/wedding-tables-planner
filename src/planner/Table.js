import React, {Component} from 'react';
import {Circle, Text, Group} from 'react-konva'

export default class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: 'grey',
            radius: 30,
            opacity: 0
        };
        this.onDragStart = this.onDragStart.bind(this);
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
        this.setState({
            opacity: 0
        });
        this.props.moveHandler(this.props.id, e.evt.layerX, e.evt.layerY)
    }

    onDragStart(){
        this.hideTooltip();
        this.setState({
            opacity: 0.5
        });
    }

    showTooltip() {
        this.props.setTooltipLocation({
            visible: true,
            x: this.props.x,
            y: this.props.y,
            guests: this.props.guests
        });
    }

    hideTooltip() {
        this.props.setTooltipLocation({
            visible: false,
            x: 0,
            y: 0,
            guests: []
        });
    }

    coordsOfGuest(i) {
        let degree = parseInt(360 / this.props.guests.length,0);
        console.log(this.props.label, degree)
        let rotation = i === 0 ? 0 : Math.PI / 180 * (i * degree);
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
            <Group key={this.props.label}>
                <Circle
                    x={this.props.x}
                    y={this.props.y}
                    radius={this.state.radius}
                    fill={this.state.color}
                    stroke={"black"}
                    strokeWidth={1}

                />
                {this.props.guests.map((e, i) => {
                    let coords = this.coordsOfGuest(i);
                    return <Circle
                        key={i + this.props.label}
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
                    text={this.props.label + "\ngoście: "+this.props.guests.length}
                />
                <Circle
                    onClick={this.handleEdit}
                    onDragEnd={this.onDragEnd}
                    onMouseEnter={this.showTooltip}
                    onMouseOut={this.hideTooltip}
                    onDragStart={this.onDragStart}
                    draggable={true}
                    x={this.props.x}
                    y={this.props.y}
                    radius={this.state.radius+5}
                    fill={this.state.color}
                    opacity={this.state.opacity}
                />
            </Group>
        );
    }
}