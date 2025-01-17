import { API_ENDPOINTS, PATH } from "../../constants";
import TableView from "../../components/TableView";
const columns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "Username",
    dataIndex: "username",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
];

const index = () => {
  return (
    <div className="user-page-container">
      <TableView
        title="User List"
        columns={columns}
        hasSearch
        pathName={PATH.users}
        apiUrl={API_ENDPOINTS.USER}
        actions={{ view: true, update: true, create: true, delete: true }}
      />
    </div>
  );
};

export default index;
