import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import BoardWidget from './../BoardWidget';
import CreateBoard from './../CreateBoard';

import { deleteBoard, cloneBoard } from './../../../../../Actions/boardActions';

const BoardList = props => {
  const { isLoading } = props.boards;

  const boards = props.boards.boards
    .filter(board => board.type === 'personal')
    .sort((a, b) => {
      if (a.sortValue > b.sortValue) {
        return 1;
      } else {
        return -1;
      }
    });

  const loader = () => {
    return <h1>Loading</h1>;
  };

  const getBoards = () => {
    return (
      <Fragment>
        <div className="mt-5">
          <div className="card">
            <div className="card-header ">
              <div className="row">
                <div className="col-sm-12">
                  <CreateBoard />
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row ">
                {boards
                  ? boards.map((board, i) => (
                      <div
                        key={board._id}
                        className="col-sm-12 col-md-6 col-lg-3"
                      >
                        <BoardWidget
                          board={board}
                          deleteBoard={props.deleteBoard}
                          cloneBoard={props.cloneBoard}
                        />
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  return isLoading ? loader() : getBoards();
};

const mapStateToProps = state => {
  return {
    boards: state.boards
  };
};

export default connect(
  mapStateToProps,
  { deleteBoard, cloneBoard }
)(BoardList);
