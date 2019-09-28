import React from 'react';
import Chip from '@material-ui/core/Chip';


export default function CustomisedChip (props){

    const[deleteState, setDelete] = React.useState(false);
    const handleClick= () => {
        if(deleteState){
            setDelete(false)
        }else{
            setDelete(true)
        }       
    }

    if (deleteState){
        return (<Chip variant="outlined" color="primary" label={props.skill.skill} clickable style={{margin:4}} 
        onClick={handleClick} onDelete={event => props.handleRemove(props.skill.skill, event)} onBlur={handleClick}/>)

    }else{
        return (<Chip variant="outlined" color="primary" label={props.skill.skill}  clickable style={{ margin: 4 }} 
        onClick={handleClick} />)
    }
}