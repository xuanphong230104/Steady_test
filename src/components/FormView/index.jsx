import { Row, Typography, Col, Spin } from "antd";
import PropTypes from "prop-types";
import Error from "../Error";
import "./index.scss";
import FormContainer from "../FormContainer";
const { Title } = Typography;

const FormView = (props) => {
  const { title, loadingInitValue, initValueError, ...formContainerProps } =
    props;

  const renderContent = () => {
    if (loadingInitValue) return <Spin className="component-loading" />;
    if (initValueError) return <Error description={initValueError} />;
    return <FormContainer {...formContainerProps} />;
  };

  return (
    <Row gutter={[12, 12]} className="form-view-container">
      <Col span={24}>
        <Title level={3}>{title}</Title>
      </Col>
      <Col span={24}>{renderContent()}</Col>
    </Row>
  );
};

FormView.propTypes = {
  initValueError: PropTypes.string,
  loadingInitValue: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default FormView;
