import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import CloseIcon from "@material-ui/icons/Close";
import green from "@material-ui/core/colors/green";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { withStyles } from "@material-ui/core/styles";

const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon
};

const styles1 = theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: "flex",
    alignItems: "left"
  }
});

function SnackbarContentWrapper(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];
  console.log(variant)
  console.log(onClose)

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={(
        <span className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      )}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
          name = 'close'
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
}

// SnackbarContentWrapper.propTypes = {
//   classes: PropTypes.shape({
//     success: PropTypes.string,
//     error: PropTypes.string,
//     icon: PropTypes.string,
//     iconVariant: PropTypes.string,
//     message: PropTypes.string,
//   }).isRequired,
//   message: PropTypes.node.isRequired,
//   onClose: PropTypes.func.isRequired,
//   variant: PropTypes.oneOf(["success", "error"]).isRequired
// };

const MySnackbarContentWrapper = withStyles(styles1)(SnackbarContentWrapper);

const CustomizedSnackbar = ({
  open,
  handleClose,
  variant,
  message
}) => {
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <MySnackbarContentWrapper
          onClose={handleClose}
          variant={variant}
          message={message}
        />
      </Snackbar>
    </div>
  );
};

// CustomizedSnackbar.propTypes = {
//   open: PropTypes.bool.isRequired,
//   handleClose: PropTypes.func.isRequired,
//   variant: PropTypes.string.isRequired,
//   message: PropTypes.string.isRequired
// };

export default CustomizedSnackbar;