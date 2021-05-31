import React, { Component } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
    border: 5px solid;
    width: 100px;
    padding: 12px;
    margin-bottom: 8px;
    border-radius: 2px;
    background-color: #fff;
    box-sizing: border-box;
    text-align: center;
    font-size: 15px;
`;


export default class Product extends Component {
    render(){
        return (
            <Draggable draggableId={this.props.product.id} index={this.props.index}>
                {(provided) => (
                    <Container
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <h3>Item</h3>
                    </Container>
                )}
            </Draggable>
        );
    }
}