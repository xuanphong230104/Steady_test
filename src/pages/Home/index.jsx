import { CloudUploadOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Space } from "antd";
import { useState } from "react";
import ProjectsTable from "./ProjectsTable";
import TasksListCard from "./TasksListCard";
import projectsData from "../../mocks/Projects.json";

const PROJECT_TABS = [
  {
    key: "all",
    label: "All projects",
  },
  {
    key: "inProgress",
    label: "Active",
  },
  {
    key: "onHold",
    label: "On Hold",
  },
];

const Home = () => {
  const [projectTabsKey, setProjectsTabKey] = useState("all");

  const PROJECT_TABS_CONTENT = {
    all: <ProjectsTable key="all-projects-table" data={projectsData} />,
    inProgress: (
      <ProjectsTable
        key="in-progress-projects-table"
        data={projectsData.filter((item) => item.status === "in progress")}
      />
    ),
    onHold: (
      <ProjectsTable
        key="on-hold-projects-table"
        data={projectsData.filter((item) => item.status === "on hold")}
      />
    ),
  };

  const onProjectsTabChange = (key) => {
    setProjectsTabKey(key);
  };

  return (
    <div>
      <Row gutter={[0, 48]}>
        <Col span={24}>
          <Card
            title="Projects"
            className="dashboard-project-card"
            bordered={false}
            style={{ boxShadow: "none" }}
            extra={
              <Space>
                <Button icon={<CloudUploadOutlined />}>Import</Button>
                <Button icon={<PlusOutlined />}>New project</Button>
              </Space>
            }
            tabList={PROJECT_TABS}
            activeTabKey={projectTabsKey}
            onTabChange={onProjectsTabChange}
          >
            {PROJECT_TABS_CONTENT[projectTabsKey]}
          </Card>
        </Col>
        <Col span={24}>
          <TasksListCard />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
