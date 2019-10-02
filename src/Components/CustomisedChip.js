import React, { useEffect } from 'react';
import Chip from '@material-ui/core/Chip';
import ReactDOM from 'react-dom'


export default function CustomisedChip (props){
    const ref = React.createRef();
    console.log("chips created")
    const[deleteState, setDelete] = React.useState(false);
    const handleClick= () => {
        if(deleteState){
            setDelete(false)
        }else{
            setDelete(true)
        }       
    }

    useEffect(() => {
        setDelete(false)
    }, [props.skill.id])

    if (deleteState){
        return (<Chip variant="outlined" color="primary" label={props.skill.skill} clickable style={{margin:4}} 
        onClick={handleClick} ref={ref} onDelete={event => 
            {ref.current.blur();props.handleRemove(props.skill, event)}} 
            onBlur={handleClick}/>)
        
    }else{
        return (<Chip variant="outlined" color="primary" label={props.skill.skill}  clickable style={{ margin: 4 }} 
        onClick={handleClick} />)
    }
}