import React, { useEffect } from 'react';
import Chip from '@material-ui/core/Chip';
import ReactDOM from 'react-dom'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Tooltip from '@material-ui/core/Tooltip';


export default function CustomisedSuggestedSkillsChip(props) {
    const ref = React.createRef();
    const [addState, setAdd] = React.useState(false);
    const handleClick = () => {
        if (addState) {
            setAdd(false)
            props.showDescription([])
            ref.current.blur()
        } else {
            setAdd(true)
            props.showDescription(jobSearchHistory)
        }
    }



    var jobSearchHistory = []
    var skillName
    var skillId
    if(props.suggested.skill[0] !== undefined){
        skillName = props.suggested.skill[0].skill
        skillId = props.suggested.skill[0].id
    }
    console.log(skillName)
    props.suggested.search_list.forEach(search => {
        if (!jobSearchHistory.includes(search.keyword.toLowerCase())) {
            jobSearchHistory.push(search.keyword)
        }
    })


    useEffect(() => {
        setAdd(false)
    }, [skillId])


    if (addState) {
        return (<Chip variant="outlined" color="primary" label={skillName} clickable style={{ margin: 4 }}
            onClick={handleClick} ref={ref} onDelete={event => { ref.current.blur(); props.handleAdd(props.suggested, event) }}
            onBlur={handleClick} deleteIcon={<Tooltip title="Add to your skills" placement="top"><AddCircleIcon /></Tooltip>} />)

    } else {
        return (<Chip variant="outlined" color="primary" label={skillName} clickable style={{ margin: 4 }}
            onClick={handleClick} />)
    }


}