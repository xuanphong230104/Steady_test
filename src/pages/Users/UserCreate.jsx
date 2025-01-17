import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS, PATH } from "../../constants";
import FormView from "../../components/FormView";

const UserCreate = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate(PATH.users);
  };
  const formItems = [
    {
      label: "Username",
      name: "username",
      rules: [{ required: true, message: "Please input username!" }],
      inputType: "input",
    },
    {
      label: "Email",
      name: "email",
      rules: [{ message: "Please input email!" }],
      inputType: "input",
    },
    {
      label: "Password",
      key: "password",
      name: "password",
      inputType: "password",
      hasConfirm: true,
    },
  ];
  return (
    <div className="create-test-script-container">
      <FormView
        title="User Create"
        apiUrl={API_ENDPOINTS.USER}
        method="post"
        handleSuccess={handleSuccess}
        formItems={formItems}
      />
    </div>
  );
};

export default UserCreate;
