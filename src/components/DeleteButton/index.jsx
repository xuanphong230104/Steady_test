import { useState } from "react";
import { Button, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axiosClient from "../../helpers/axiosClient";
import PropTypes from "prop-types";

const DeleteButton = (props) => {
  const { apiUrl, handleSuccess } = props;
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const showPopconfirm = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    setIsLoading(true);
    axiosClient
      .delete(apiUrl)
      .then(() => {
        message.success("Deleted data successfully.");
        handleSuccess();
        handleCancel();
        setIsLoading(false);
      })
      .catch((err) => {
        const errMsg = err.response.data?.message || err?.message;
        message.error(`Error: ${errMsg}`);
        handleCancel();
        setIsLoading(false);
      });
  };

  return (
    <Popconfirm
      title="Are you sure to delete?"
      onConfirm={handleDelete}
      onCancel={handleCancel}
      open={open}
      okButtonProps={{
        loading: isLoading,
      }}
      okText="Yes"
      cancelText="No"
    >
      <Button
        onClick={showPopconfirm}
        icon={<DeleteOutlined />}
        color="danger"
        variant="outlined"
      />
    </Popconfirm>
  );
};

DeleteButton.propTypes = {
  apiUrl: PropTypes.string.isRequired,
  handleSuccess: PropTypes.func,
};

export default DeleteButton;
