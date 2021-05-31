import React, { Component } from 'react';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './column';
import Product from './product';
import Row from './row';

const BodyBlock = styled.div`
    background-color: #CCFFFF;
    margin: 0;
    paddding: 0;
    width: 100%;
    height: 100vh;
    display: flex;
`;
const PhoneContainer = styled.div`
    display: table;
    margin: 50px auto 0;
    min-width: 900px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.15);
    -moz-box-shadow: 0 0 10px 0 rgba(0,0,0,0.15);
    -webkit-box-shadow: 0 0 10px 0 rgba(0,0,0,0.15);
`;
const WeekDaysBlock = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const ProductsBlock = styled.div`
    display: table;
    margin: 50px auto 0;
    border-radius: 5px;
    width: 260px;
    background-color: #FFF;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.15);
    -moz-box-shadow: 0 0 10px 0 rgba(0,0,0,0.15);
    -webkit-box-shadow: 0 0 10px 0 rgba(0,0,0,0.15);
`;

const ProductList = styled.div`
    padding: 8px;
`;

export default class Main extends Component {
    state = initialData;

    onDragEnd = result => {
        
        const { destination, source, draggableId } = result;
        console.log(destination);
        if(!destination || destination.droppableId === 'products'){
            return;
        }

        if(
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = source.droppableId === 'products' ?
                this.state.productsColumn[source.droppableId] : 
                this.state.days[source.droppableId];
        const finish = this.state.days[destination.droppableId];
        
        // moving from one list to another
        const startProductIds = Array.from(
            source.droppableId === 'products' ? 
            start.productIds : start.productIds);
        
            startProductIds.splice(source.index, 1);
        const newStart = {
            ...start,
            productIds: startProductIds,
        };        

        const finishProductIds = Array.from(finish.productIds);

        finishProductIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            productIds: finishProductIds,
        };

        // removing the item from products state
        if(source.droppableId === 'products'){
            const newpIDs = this.state.productsColumn.products.productIds;
            const prodRemove = draggableId;
            const remIndex = newpIDs.indexOf(prodRemove);
            newpIDs.splice(remIndex, 1);
        }
        
        // updating total price
        const currentItemPrice = 
        source.droppableId === 'products' ? 
        this.state.products[draggableId].price : 0;

        const newState = {
            ...this.state,
            totalPrice: parseInt(currentItemPrice) + parseInt(this.state.totalPrice),
            days: {
                ...this.state.days,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            },
            productsColumn: {
                ...this.state.productsColumn,
            }
        };
        this.setState(newState);
    }

    render(){
        let totalPrice = this.state.totalPrice;
        return (
            <BodyBlock>
                <DragDropContext onDragEnd={this.onDragEnd}>          
                        <ProductsBlock>
                            <Droppable droppableId={this.state.productsColumn.products.id}>
                                {(provided) => (
                                    <ProductList
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {this.state.productsColumn.products.productIds.map((product, index) => 
                                            <Product key={product} product={this.state.products[product]} index={index} />
                                        )}
                                        {provided.placeholder}
                                    </ProductList>
                                )}
                            </Droppable>
                        </ProductsBlock> 
                         <PhoneContainer>
                        <WeekDaysBlock>
                            {this.state.daysOrder.map((dayId) => {
                                const day = this.state.days[dayId];
                                const products = day.productIds.map(productId => this.state.products[productId]);
                                
                                return <Column key={day.id} day={day} products={products} />;
                            })}
                        </WeekDaysBlock>
                    </PhoneContainer>

                </DragDropContext>
            </BodyBlock>
        )
    }
}