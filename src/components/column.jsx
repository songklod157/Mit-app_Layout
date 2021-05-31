import React, { Component } from 'react';
import styled from 'styled-components';
import { DragDropContext,Draggable,Droppable } from 'react-beautiful-dnd';
import Product from './product';

const Container = styled.div`
    margin: 20px;
    width: 80%;
    min-height: 500px;
`;
const ProductList = styled.div`
    padding: 20px;
    &:hover {
        border: 5px solid #FFFF33;
      }
`;


export default class Column extends Component {
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