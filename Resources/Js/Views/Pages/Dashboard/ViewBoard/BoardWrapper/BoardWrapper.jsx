import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Droppable, Draggable } from 'react-beautiful-dnd';

import CreateCard from '../CreateCard';
import CardWidget from '../CardWidget';
import ChangeBackground from '../ChangeBackground';

import './style.css';

const BoardWrapper = props => {
  const [id, setId] = useState(props.match.params.id);
  const [cardWithAddForm, setCardWithAddForm] = useState('');
  const [itemEdit, setItemEdit] = useState('');

  if (props.board) {
    if (props.board.bg) {
      var background = `url(${props.board.bg.raw}) no-repeat`;
    } else {
      var background = '';
    }
  } else {
    var background = '';
  }

  var cards = props.cards.sort((a, b) => {
    if (a.sortValue > b.sortValue) {
      return 1;
    } else {
      return -1;
    }
  });

  return (
    <Fragment>
      <div style={{ background }} className="board-wrapper" />
      <div className="board-wrapper-overlay" />
      <Droppable droppableId={id} type="card" direction="horizontal">
        {provided => (
          <section
            id="board-single"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div className="cards">
              {cards.map((card, i) => (
                <Draggable key={card._id} index={i} draggableId={card._id}>
                  {provided => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <CardWidget
                        closeEditDialog={() => setItemEdit('')}
                        itemEdit={itemEdit}
                        setItemEdit={id => setItemEdit(id)}
                        closeAddForm={() => setCardWithAddForm('')}
                        setCardAddForm={id => setCardWithAddForm(id)}
                        cardWithAddForm={cardWithAddForm}
                        key={card._id}
                        card={card}
                        index={i}
                        provided={provided}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <div className="card-wrapper">
                <CreateCard id={id} style={{ zIndex: 20000 }} />
                <ChangeBackground
                  board={props.board}
                  style={{ zIndex: 20000 }}
                />
              </div>
            </div>
          </section>
        )}
      </Droppable>
    </Fragment>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    cards: state.cards.cards.filter(
      card => card.parentBoard === ownProps.match.params.id
    ),
    board: state.boards.boards.filter(
      board => board._id === ownProps.match.params.id
    )[0]
  };
}
export default connect(
  mapStateToProps,
  {}
)(BoardWrapper);
