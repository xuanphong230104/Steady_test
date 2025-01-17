import { Tag } from "antd";
import PropTypes from "prop-types";

const ActiveTag = ({ active }) => (
  <Tag color={active ? "success" : "error"}>{active ? "Trueeeeee" : "False"}</Tag>
);

ActiveTag.propTypes = {
  active: PropTypes.bool,
};

export default ActiveTag;
