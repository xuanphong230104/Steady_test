import { Tabs, Typography } from "antd";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../../constants";
import axiosClient from "../../helpers/axiosClient";
import FormContainer from "../../components/FormContainer";
import authActions from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const { Title } = Typography;
const formEmail = [
  {
    name: "email",
    label: "Email",
    rules: [{ required: true, message: "Please input email!" }],
    inputType: "input",
  },
];
const formUsername = [
  {
    name: "current_password",
    label: "Current Password",
    rules: [{ required: true, message: "Please input current password!" }],
    inputType: "password",
  },
  {
    name: "new_username",
    label: "New Username",
    rules: [{ required: true, message: "Please input username!" }],
    inputType: "input",
  },
];
const formPassword = [
  {
    name: "current_password",
    label: "Current Password",
    rules: [{ required: true, message: "Please input current password!" }],
    inputType: "password",
  },
  {
    name: "new_password",
    label: "New Password",
    hasConfirm: true,
    rules: [{ required: true, message: "Please input new password!" }],
    inputType: "password",
  },
];

const UserUpdate = (...props) => {
  const { dispatch } = props;
  const params = useParams();
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const handleSuccess = (form) => {
    form.resetFields();
  };
  const handleSuccessEmail = (form) => {
    dispatch(authActions.getUserLogin());
    form.resetFields();
  };
  const items = [
    {
      key: "1",
      label: "Change Email",
      children: (
        <FormContainer
          initialValues={data}
          method="put"
          formItems={formEmail}
          handleSuccess={handleSuccessEmail}
          apiUrl={`${API_ENDPOINTS.USER}${params.id}/`}
          loadingInitValue={isLoading}
          initValueError={error}
        />
      ),
    },
    {
      key: "2",
      label: "Change Username ",
      children: (
        <FormContainer
          method="post"
          formItems={formUsername}
          handleSuccess={handleSuccess}
          apiUrl={`${API_ENDPOINTS.USER}set_username/`}
        />
      ),
    },
    {
      key: "3",
      label: "Change Password",
      children: (
        <FormContainer
          method="post"
          formItems={formPassword}
          handleSuccess={handleSuccess}
          apiUrl={`${API_ENDPOINTS.USER}set_password/`}
        />
      ),
    },
  ];
  const getUsersDetail = () => {
    axiosClient
      .get(`${API_ENDPOINTS.USER}${params.id}`)
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || err?.message);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    if (params.id) {
      setIsLoading(true);
      getUsersDetail();
    }
  }, [params.id]);
  return (
    <div className="edit-user-page-container">
      <Title level={2}>Edit User</Title>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

const mapStateToProps = (state) => {
  const { authentication } = state;
  return {
    authentication,
  };
};
UserUpdate.propTypes = {
  dispatch: PropTypes.func,
};

export default connect(mapStateToProps)(UserUpdate);
