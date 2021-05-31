import React, { Component } from 'react';
import styled from 'styled-components';
import { DragDropContext,Draggable,Droppable } from 'react-beautiful-dnd';
import Product from './product';

const Container = styled.div`
    margin-top: 100px;
    width: 20%;
    min-height: 500px;
`;
const ProductList = styled.div`
    padding: 20px;
    background-color: #777;
`;

export default class Row extends Component {
    render(){
        return (
                    <Container>
                            <Droppable droppableId={this.props.day.id}>
                    {(provided) => (
                        <ProductList
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {this.props.products.map((product, index) => (
                                <Product key={product.id} product={product} index={index} />
                            ))}
                            {provided.placeholder}
                        </ProductList>
                    )}
                </Droppable>
            </Container>
            
            
        );
    }
}