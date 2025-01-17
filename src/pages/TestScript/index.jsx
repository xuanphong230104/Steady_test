import { Tooltip } from "antd";
import TableView from "../../components/TableView";
import { API_ENDPOINTS, PATH } from "../../constants";
import ActiveTag from "../../components/ActivateTag";
import "./index.scss";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "Project",
    dataIndex: "project",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Script",
    dataIndex: "script",
    render: (text) => (
      <Tooltip
        overlayClassName="tooltip-script-text"
        title={<pre>{`${text}`}</pre>}
      >
        <span className="truncate-text">{text}</span>
      </Tooltip>
    ),
  },
  {
    title: "Is Active",
    dataIndex: "is_active",
    render: (active) => <ActiveTag active={active} />,
  },
  {
    title: "Description",
    dataIndex: "description",
  },
];

const TestScript = () => {
  return (
    <div className="test-script-container">
      <TableView
        title="Test Script"
        columns={columns}
        hasSearch
        pathName={PATH.testScript}
        apiUrl={API_ENDPOINTS.TEST_SCRIPT}
        actions={{ view: true, update: true, create: true }}
      />
    </div>
  );
};
export default TestScript;
