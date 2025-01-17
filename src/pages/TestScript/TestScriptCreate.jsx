import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS, PATH } from "../../constants";
import FormView from "../../components/FormView";
import "./index.scss";

const formItems = [
  {
    label: "Project",
    name: "project_id",
    valueKey: "id",
    labelKey: "name",
    optionTarget: API_ENDPOINTS.PROJECT,
    rules: [{ required: true, message: "Please select project!" }],
    inputType: "selectDataFromAPI",
  },
  {
    label: "Name",
    name: "name",
    rules: [{ required: true, message: "Please input test script name!" }],
    inputType: "input",
  },
  {
    label: "Script",
    name: "script",
    inputType: "script",
    rules: [{ required: true, message: "Please input script!" }],
  },
  {
    label: "Description",
    name: "description",
    inputType: "textArea",
  },
];

const TestScriptCreate = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate(PATH.testScript);
  };

  return (
    <div className="create-test-script-container">
      <FormView
        title="Test Script Create"
        apiUrl={API_ENDPOINTS.TEST_SCRIPT}
        method="post"
        handleSuccess={handleSuccess}
        formItems={formItems}
      />
    </div>
  );
};

export default TestScriptCreate;
