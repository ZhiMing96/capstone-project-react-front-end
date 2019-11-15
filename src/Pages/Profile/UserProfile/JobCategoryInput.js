import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Select from 'react-select';
import { emphasize, makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import './JobCategoryInput.css'

const suggestions = [
  { name: 'Accounting / Auditing / Taxation' },
  { name: 'Admin / Secretarial' },
  { name: 'Advertising / Media' },
  { name: 'Architecture / Interior Design' },
  { name: 'Banking and Finance'},
  { name: 'Building and Construction' },
  { name: 'Consulting' },
  { name: 'Customer Service'},
  { name: 'Design' },
  { name: 'Education and Training' },
  { name: 'Engineering' },
  { name: 'Entertainment' },
  { name: 'Environment / Health' },
  { name: 'Events / Promotions' },
  { name: 'F&B' },
  { name: 'General Management'},
  { name: 'General Work' },
  { name: 'Healthcare / Pharmaceutical' },
  { name: 'Hospitality' },
  { name: 'Human Resources' },
  { name: 'Information Technology' },
  { name: 'Insurance' },
  { name: 'Legal' },
  { name: 'Logistics / Supply Chain' },
  { name: 'Manufacturing' },
  { name: 'Marketing / Public Relations' },
  { name: 'Medical / Therapy Services' },
  { name: 'Personal Care / Beauty' },
  { name: 'Professional Services' },
  { name: 'Public / Civil Service' },
  { name: 'Purchasing / Merchandising' },
  { name: 'Real Estate / Property Management' },
  { name: 'Repair and Maintenance' },
  { name: 'Risk Management' },
  { name: 'Sales / Retail' },
  { name: 'Sciences / Laboratory / R&D' },
  { name: 'Security and Investigation' },
  { name: 'Social Services' },
  { name: 'Telecommunications' },
  { name: 'Travel / Tourism' },
  { name: 'Others' },
].map(suggestion => ({
  value: suggestion.name,
  label: suggestion.name,
}));

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: 250,
    minWidth: 290,
    width: "100%",
    marginLeft: 8,
    marginRight: 8,
  },
  input: {
    display: 'flex',
    padding: 0,
    height: 'auto',
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: theme.spacing(1, 2),
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    bottom: 6,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing(2),
  },
}));

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

NoOptionsMessage.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.node,
  /**
   * Props to be passed on to the wrapper.
   */
  innerProps: PropTypes.object.isRequired,
  selectProps: PropTypes.object.isRequired,
};

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

inputComponent.propTypes = {
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any.isRequired,
    }),
  ]),
};

function Control(props) {
  const {
    children,
    innerProps,
    innerRef,
    selectProps: { classes, TextFieldProps },
  } = props;

  return (
    <TextField
      fullWidth
      margin="normal"
      InputProps={{
        inputComponent,
        inputProps: {
          className: classes.input,
          ref: innerRef,
          children,
          ...innerProps,
        },
      }}
      {...TextFieldProps}
    />
  );
}

Control.propTypes = {
  /**
   * Children to render.
   */
  children: PropTypes.node,
  /**
   * The mouse down event and the innerRef to pass down to the controller element.
   */
  innerProps: PropTypes.shape({
    onMouseDown: PropTypes.func.isRequired,
  }).isRequired,
  innerRef: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any.isRequired,
    }),
  ]).isRequired,
  selectProps: PropTypes.object.isRequired,
};

function Option(props) {
  return (
    <MenuItem
      ref={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

Option.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.node,
  /**
   * props passed to the wrapping element for the group.
   */
  innerProps: PropTypes.shape({
    id: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    onMouseMove: PropTypes.func.isRequired,
    onMouseOver: PropTypes.func.isRequired,
    tabIndex: PropTypes.number.isRequired,
  }).isRequired,
  /**
   * Inner ref to DOM Node
   */
  innerRef: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any.isRequired,
    }),
  ]).isRequired,
  /**
   * Whether the option is focused.
   */
  isFocused: PropTypes.bool.isRequired,
  /**
   * Whether the option is selected.
   */
  isSelected: PropTypes.bool.isRequired,
};


function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

ValueContainer.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.node,
  selectProps: PropTypes.object.isRequired,
};

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={clsx(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
      variant="outlined"
    />
  );
}

MultiValue.propTypes = {
  children: PropTypes.node,
  isFocused: PropTypes.bool.isRequired,
  removeProps: PropTypes.shape({
    onClick: PropTypes.func.isRequired,
    onMouseDown: PropTypes.func.isRequired,
    onTouchEnd: PropTypes.func.isRequired,
  }).isRequired,
  selectProps: PropTypes.object.isRequired,
};

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

Menu.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.element.isRequired,
  /**
   * Props to be passed to the menu wrapper.
   */
  innerProps: PropTypes.object.isRequired,
  selectProps: PropTypes.object.isRequired,
};

const components = {
  Control,
  Menu,
  MultiValue,
  Option,
  ValueContainer,
};

export default function IntegrationReactSelect(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [multi, setMulti] = React.useState(null);
  const[categories, setCategories] = React.useState([]);

  useEffect(()=>{
    var arr=[]
    if(props.categories !== null){
      for(var i = 0; i<props.categories.length;i++){
        arr.push(
          {label: props.categories[i],
            value: props.categories[i],
          }
        )
      }
      console.log(arr)
      setMulti(arr)
    }
  },[props.categories])
  

  const handleChangeMulti = value => {
    if(value!== null && value.length>3){
     //setMenuClose(true)
      return
    }
      console.log(value)
      setMulti(value);
      props.handleCategory(value)
  }
    

  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit',
      },
    }),
  };

  return (
    <div className={classes.root}>
      <NoSsr>
        <Select
          classes={classes}
          styles={selectStyles}
          inputId="react-select-multiple"
          TextFieldProps={{
            label: 'Relevant Job Categories',
            helperText: "Select up to 3",
            InputLabelProps: {
              htmlFor: 'react-select-multiple',
              shrink: true,
            },
          }}
          options={suggestions}
          placeholder={null}
          components={components}
          value={multi}
          onChange={handleChangeMulti}
          isMulti
          closeMenuOnSelect={false}
          defaultMenuIsOpen={false}
          autoHighlight={false}
        />
      </NoSsr>
    </div>
  );
}


