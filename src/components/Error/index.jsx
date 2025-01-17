import { Alert } from "antd";
import PropTypes from "prop-types";

const Error = (props) => {
  const { message = "Error", description } = props;
  return (
    <Alert message={message} description={description} type="error" showIcon />
  );
};

Error.propTypes = {
  message: PropTypes.string,
  description: PropTypes.string.isRequired,
};

export default Error;
