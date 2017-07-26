import React, {Component} from 'react';
import {Text, Group, Rect} from 'react-konva'

export default class TableTooltip extends Component {
    render() {
        return (
            <Group>
                <Rect
                    x={this.props.data.x}
                    y={this.props.data.y}
                    width={140}
                    height={this.props.data.guests.length * 14}
                    stroke={"black"}
                    fill={"#fff"}
                    padding={20}
                    strokeWidth={1}
                />
                <Text
                    x={this.props.data.x}
                    y={this.props.data.y}
                    width={150}
                    height={this.props.data.guests.length * 14}
                    padding={10}
                    fill={"#000"}
                    text={this.props.data.guests.map(g => g.name).join("\n")}
                />
            </Group>

        )
    }
}