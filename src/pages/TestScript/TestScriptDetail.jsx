import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Col, Descriptions, Row, Spin, Typography } from "antd";
import axiosClient from "../../helpers/axiosClient";
import { API_ENDPOINTS } from "../../constants";
import ActiveTag from "../../components/ActivateTag";
import Error from "../../components/Error";
import "./index.scss";

const { Title } = Typography;

const TestScriptDetail = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getTestScriptDetail = () => {
    setIsLoading(true);
    axiosClient
      .get(`${API_ENDPOINTS.TEST_SCRIPT}/${params.id}`)
      .then((response) => {
        setData(response.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || err?.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (params.id) getTestScriptDetail();
  }, [params.id]);

  if (isLoading) return <Spin className="component-loading" />;

  const renderContent = () => (
    <Descriptions column={1}>
      <Descriptions.Item label="Id">{data.id}</Descriptions.Item>
      <Descriptions.Item label="Project Id">{data.project}</Descriptions.Item>
      <Descriptions.Item label="Name">{data.name}</Descriptions.Item>
      <Descriptions.Item label="Script" className="script-content">
        <pre>{`${data.script}`}</pre>
      </Descriptions.Item>
      <Descriptions.Item label="Description">
        {data.description}
      </Descriptions.Item>
      <Descriptions.Item label="Is Active">
        <ActiveTag active={data.is_active} />
      </Descriptions.Item>
    </Descriptions>
  );

  return (
    <div className="test-script-detail">
      <Row>
        <Col span={24}>
          <Title level={3}>Test Script Detail</Title>
        </Col>
        <Col span={24}>
          {error ? <Error description={error} /> : renderContent()}
        </Col>
      </Row>
    </div>
  );
};

export default TestScriptDetail;
