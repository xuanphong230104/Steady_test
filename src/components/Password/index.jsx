import { Form, Input } from "antd";
import PropTypes from "prop-types";
const Password = (props) => {
  const { hasConfirm, label, name, rules } = props;
  return (
    <div>
      <Form.Item label={label} name={name} rules={rules}>
        <Input.Password />
      </Form.Item>
      {hasConfirm && (
        <Form.Item
          label={`Confirm ${label}`}
          name={`confirm${name}`}
          dependencies={[name]}
          rules={[
            { required: true, message: "Please confirm the password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue(name) === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The password does not match!"),
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      )}
    </div>
  );
};
Password.propTypes = {
  hasConfirm: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rules: PropTypes.array.isRequired,
};
export default Password;
