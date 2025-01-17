import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { EditOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Input, Row, Space, Table, Typography } from "antd";
import Error from "../Error";
import DeleteButton from "../DeleteButton";
import { ActionTypes } from "../../constants";
import { addKeyForList, customSortList } from "../../helpers/common";
import axiosClient from "../../helpers/axiosClient";
import "./index.scss";

const { Title } = Typography;
const { Search } = Input;

const TableView = (props) => {
  const {
    actions,
    columns,
    apiUrl,
    dataIndex = "id",
    pathName = "",
    title,
    hasSearch,
  } = props;

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const isShowActionsTable = [
    ActionTypes.view,
    ActionTypes.update,
    ActionTypes.delete,
  ].some((item) => actions[item]);

  const getData = () => {
    setIsLoading(true);
    axiosClient
      .get(apiUrl)
      .then((response) => {
        const addKeyForContent = addKeyForList(
          Array.isArray(response.data) ? response.data : response.data.data,
          dataIndex,
        );
        const sortedData = customSortList(
          addKeyForContent,
          columns[0].dataIndex,
        );
        setData(sortedData);
        setFilteredData(sortedData);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || err.message);
        setIsLoading(false);
      });
  };

  const handleSuccess = () => {
    getData();
  };

  const onSearch = (value) => {
    const searchStringLower = value.toLowerCase().trim();
    const updateData = data.filter((item) =>
      columns.some(
        (column) =>
          typeof item[column.dataIndex] === "string" &&
          item[column.dataIndex].toLowerCase().includes(searchStringLower),
      ),
    );
    setFilteredData(searchStringLower ? updateData : data);
  };

  useEffect(() => {
    getData();
  }, []);

  const updateColumns = useMemo(
    () => [
      ...columns,
      ...(isShowActionsTable
        ? [
            {
              title: "Action",
              render: (record) => {
                return (
                  <Space>
                    {actions.view && (
                      <Link to={`${pathName}/${record[dataIndex]}`}>
                        <Button icon={<EyeOutlined />} />
                      </Link>
                    )}
                    {actions.update && (
                      <Link to={`${pathName}/${record[dataIndex]}/update`}>
                        <Button
                          icon={<EditOutlined />}
                          color="primary"
                          variant="outlined"
                        />
                      </Link>
                    )}
                    {actions.delete && (
                      <DeleteButton
                        apiUrl={`${apiUrl}/${record[dataIndex]}`}
                        handleSuccess={handleSuccess}
                      />
                    )}
                  </Space>
                );
              },
            },
          ]
        : []),
    ],
    [actions, columns],
  );

  return (
    <div className="table-view-container">
      <Row gutter={[12, 12]}>
        <Col xs={24} sm={12}>
          <Title level={3}>{title}</Title>
        </Col>
        <Col xs={24} sm={12}>
          <Flex
            justify="flex-end"
            align="center"
            className="table-view-header-right"
            gap="small"
          >
            {hasSearch && (
              <Search
                className="table-search-btn"
                placeholder="Enter search..."
                onSearch={onSearch}
              />
            )}
            {actions.create && (
              <Link to={`${pathName}/${ActionTypes.create}`}>
                <Button icon={<PlusOutlined />}>{`New ${title}`}</Button>
              </Link>
            )}
          </Flex>
        </Col>
        <Col span={24}>
          {error ? (
            <Error description={error} />
          ) : (
            <Table
              columns={updateColumns}
              dataSource={filteredData}
              loading={isLoading}
              pagination
              scroll={{
                x: "max-content",
              }}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

TableView.propTypes = {
  actions: PropTypes.object,
  columns: PropTypes.array.isRequired,
  apiUrl: PropTypes.string.isRequired,
  dataIndex: PropTypes.string,
  pathName: PropTypes.string,
  title: PropTypes.string.isRequired,
  hasSearch: PropTypes.bool,
};

export default TableView;
