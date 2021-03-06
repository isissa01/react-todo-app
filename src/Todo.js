import React, { useState } from 'react'

import { ListItem, ListItemText, ListItemIcon, Button, Modal, makeStyles, TextField } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import './Todo.css'
import db from './firebase'
const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.7)'
    },

  }));
function Todo(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () =>{
        setOpen(true);
    };
    const [input, setInput] = useState(props.todo.todo);
    const classes = useStyles();
    return (
        
        <div>
        <Modal className={classes.modal} 
        open={open}
        onClose={e => setOpen(false)}
        // aria-labelledby="transition-modal-title"
        // aria-describedby="transition-modal-description"

        >  
            <div id="update_modal">
                <h1>Edit your todo</h1>
                <form>
                <TextField id="input" label="Update todo"value = {input} color="secondary" onChange={event =>setInput(event.target.value)} />
                <Button id="update" type='submit' disabled= {!input } onClick= {e => {
                    e.preventDefault();
                    db.collection('todos').doc(props.todo.id).update({todo: input});
                    setInput('');
                    setOpen(false)

                }}><CheckBoxIcon></CheckBoxIcon> Update</Button>
                
                <Button   id="cancel" onClick= {e => {
                    // e.preventDefault();
                    setOpen(false);
                    }}><CancelPresentationIcon />Cancel</Button>
                </form>
            </div>
            
        </Modal>
           
  
        <ListItem button key={props.todo.id}>
        <ListItemIcon>
        </ListItemIcon>
            <ListItemText secondary={props.todo.timestamp} primary={props.todo.todo} />
            <EditIcon id= "edit" onClick= {e => setOpen(true)}/>
            <DeleteForeverIcon id="cancel" onClick={ event => db.collection('todos').doc(props.todo.id).delete()}/>
        </ListItem>
        </div>
)
}

export default Todo
