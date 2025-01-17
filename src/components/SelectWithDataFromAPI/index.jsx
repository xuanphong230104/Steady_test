import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Select, Alert, Form } from "antd";
import axiosClient from "../../helpers/axiosClient";

/**
 * Define a React function component called Select With Relation
 * @param {String} optionTarget URL of the API endpoint to fetch options from
 * @param {String} name Name of the select dropdown
 * @param {String} placeholder Placeholder text for the select dropdown
 * @param {String} mode Mode of the select dropdown (single or multiple selection)
 * @param {Boolean} allowClear Allow clear of the select dropdown
 * @param {String} label Label text for the select dropdown
 * @param {String} dataIndex the key of data from API to get to get select box options
 * @param {String} labelKey the key of data from API to get to get label of select box options
 * @param {String} valueKey the key of data from API to get to get key of select box options
 * @param {array} rules the rules for Form Item
 * @return {*} Return a Select component
 */
const SelectWithDataFromAPI = (props) => {
  const {
    optionTarget,
    name,
    placeholder,
    mode,
    allowClear,
    label,
    labelKey = "name",
    valueKey = "name",
    rules,
  } = props;
  const [dataList, setDataList] = useState([]);
  const [errMessage, setErrMessage] = useState();
  const [refreshingData, setRefreshingData] = useState(false);

  const getDataList = () => {
    /**
     * get data from optionTarget Url
     * @return setState dataList if success
     */
    setRefreshingData(true);
    axiosClient
      .get(optionTarget)
      .then((response) => {
        const data = response.data.data.map((each) => ({
          label: each[labelKey],
          value: each[valueKey],
        }));
        setDataList(data);
        setRefreshingData(false);
      })
      .catch((error) => {
        const err = error.response;
        setErrMessage(err?.data?.message || error.message);
        setRefreshingData(false);
      });
  };

  useEffect(() => {
    getDataList();
  }, []);

  return (
    <Form.Item key={name} label={label} name={name} rules={rules}>
      {errMessage ? (
        <Alert message="Error" description={errMessage} type="error" showIcon />
      ) : (
        <Select
          mode={mode}
          loading={refreshingData}
          allowClear={allowClear}
          placeholder={placeholder}
          options={dataList}
        />
      )}
    </Form.Item>
  );
};

SelectWithDataFromAPI.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  optionTarget: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  mode: PropTypes.string,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  allowClear: PropTypes.bool,
  rules: PropTypes.array,
};

export default SelectWithDataFromAPI;
