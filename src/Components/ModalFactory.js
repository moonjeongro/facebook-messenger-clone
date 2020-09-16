import React, { useReducer, createContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '.2rem solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


const initialState = false;

function reducer(state, action) {
  switch (action.type) {
    case 'open':
      return true;
    case 'close':
      return false;
    default:
      throw new Error();
  }
}

export const ModalContext = createContext(null);

function ModalFactory(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render

  const [open, dispatch] = useReducer(reducer, initialState);
  const [modalStyle] = React.useState(getModalStyle);

  function handleClose(){
    dispatch({type:'close'})
  }

  const Button = props.button;
  const Content = props.content;

  return (
    <ModalContext.Provider value={dispatch}>
      <Button dispatch={dispatch} {...props.buttonProps} />
      <Modal
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <Content dispatch={dispatch} {...props.contentProps} />
        </div>
      </Modal>
    </ModalContext.Provider>
  );
}

export default ModalFactory;
