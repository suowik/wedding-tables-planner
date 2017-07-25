import React, {Component} from 'react';
import {Text, Group, Rect} from 'react-konva'

export default class TableTooltip extends Component {
    render() {
        return (
            <Group>
                <Rect
                    x={this.props.x}
                    y={this.props.y}
                    width={120}
                    height={150}
                    stroke={"black"}
                    fill={"#fff"}
                    padding={20}
                    strokeWidth={1}
                />
                <Text
                    x={this.props.x}
                    y={this.props.y}
                    width={120}
                    height={150}
                    padding={10}
                    fill={"#000"}
                    text={this.props.guests.join("\n")}
                />
            </Group>

        )
    }
}