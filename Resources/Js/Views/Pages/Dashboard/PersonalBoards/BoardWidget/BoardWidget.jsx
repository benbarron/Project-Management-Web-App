import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import EditBoard from './../EditBoard';

import './BoardWidget.css';

import { makeStyles } from '@material-ui/core/styles';
import { MoreVert } from '@material-ui/icons';
import {
  Card,
  CardContent,
  Paper,
  Menu,
  MenuItem,
  IconButton,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    marginTop: 60
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  button: {
    marginTop: 30,
    marginRight: 20
  },
  paper: {
    padding: 5
  }
});

const BoardWidget = props => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const { board } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (props.board) {
    console.log(props.board);

    if (props.board.bg) {
      var background = `url(${props.board.bg.regular}) no-repeat`;
    } else {
      var background = '#a4b0be';
    }
  } else {
    var background = '#a4b0be';
  }

  return (
    <Fragment>
      <div>
        <Paper
          style={{
            background,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            right: 0,
            zIndex: 1000,
            width: '100%',
            height: 120,
            marginTop: 40
          }}
        >
          <Card
            className={classes.paper}
            style={{
              position: 'absolute',
              background: 'rgba(0,0,0,0.6)',
              width: '100%',
              height: '100%'
            }}
          >
            <CardContent>
              <Fragment>
                <Typography
                  variant="h5"
                  component="h2"
                  color="textSecondary"
                  style={{ margin: 0, color: '#fff' }}
                >
                  {board.name}
                </Typography>
                {board.description ? (
                  <Typography variant="subtitle1" component="p">
                    {board.description}
                  </Typography>
                ) : null}
              </Fragment>
              <Fragment>
                <div className="board-menu-btn">
                  <IconButton onClick={handleClick}>
                    <MoreVert style={{ color: '#fff' }} />
                  </IconButton>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem>
                      <Link
                        style={{ color: '#000' }}
                        to={`/board/${board._id}`}
                      >
                        View Board
                      </Link>
                    </MenuItem>
                    <EditBoard board={board} handleClose={handleClose} />
                    <MenuItem
                      onClick={() => {
                        props.deleteBoard(board._id);
                        handleClose();
                      }}
                    >
                      Delete Board
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        props.cloneBoard(board._id);
                        handleClose();
                      }}
                    >
                      Clone Board
                    </MenuItem>
                  </Menu>
                </div>
              </Fragment>
            </CardContent>
          </Card>
        </Paper>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  {}
)(BoardWidget);
