import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../../constants";
import axiosClient from "../../helpers/axiosClient";
import FormView from "../../components/FormView";
import "./index.scss";

const formItems = [
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
  {
    label: "Is Active",
    name: "is_active",
    inputType: "switch",
  },
];

const TestScriptUpdate = () => {
  const params = useParams();
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getTestScriptDetail = () => {
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

  const handleSuccess = () => {
    getTestScriptDetail();
  };

  useEffect(() => {
    if (params.id) {
      setIsLoading(true);
      getTestScriptDetail();
    }
  }, [params.id]);

  return (
    <div className="edit-test-script-container">
      <FormView
        title="Test Script Update"
        initialValues={data}
        method="put"
        formItems={formItems}
        handleSuccess={handleSuccess}
        apiUrl={`${API_ENDPOINTS.TEST_SCRIPT}/${params.id}`}
        loadingInitValue={isLoading}
        initValueError={error}
      />
    </div>
  );
};

export default TestScriptUpdate;
