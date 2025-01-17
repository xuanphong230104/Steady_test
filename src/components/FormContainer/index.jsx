import { Form, Input, Select, Switch, Button } from "antd";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import axiosClient from "../../helpers/axiosClient";
import { vscodeLight } from "@uiw/codemirror-theme-vscode";
import SelectWithDataFromAPI from "../SelectWithDataFromAPI";
import Password from "../Password";
import Error from "../Error";
const FormContainer = (props) => {
  const {
    apiUrl,
    method,
    formItems,
    formConfig = {},
    initialValues,
    handleSuccess = () => {},
  } = props;

  const [form] = Form.useForm();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();
  const [disabledSubmitBtn, setDisabledSubmitBtn] = useState(true);

  const handleDisableBtn = (values) => {
    const keys = Object.keys(values);
    if (!initialValues) {
      return (
        !Object.values(values).some((value) => !!value) ||
        !!form.getFieldsError().filter(({ errors }) => errors.length).length
      );
    }
    return (
      keys.every((key) => values[key] === initialValues[key]) ||
      !!form.getFieldsError().filter(({ errors }) => errors.length).length
    );
  };
  const renderFormItem = (formItem) => {
    const { label, name, rules, disabled, inputType, placeholder, ...rest } =
      formItem;
    let inputNode;
    switch (inputType) {
      case "input":
        inputNode = <Input {...rest} />;
        break;
      case "textArea":
        inputNode = <Input.TextArea {...rest} />;
        break;
      case "select":
        inputNode = <Select {...rest} />;
        break;
      case "switch":
        inputNode = <Switch {...rest} />;
        break;
      case "password":
        return <Password key={name} {...formItem} />;

      case "script":
        inputNode = (
          <CodeMirror
            className="code-editor"
            value={initialValues?.script}
            minHeight="200px"
            maxHeight="500px"
            theme={vscodeLight}
            extensions={[python()]}
            onChange={(value) => {
              form.setFieldValue(name, value);
            }}
            placeholder={placeholder}
            disabled={disabled}
          />
        );
        break;
      case "selectDataFromAPI":
        return <SelectWithDataFromAPI key={name} {...formItem} />;
      default:
        inputNode = <Input {...rest} />;
        break;
    }

    return (
      <Form.Item
        key={name}
        label={label}
        name={name}
        rules={rules}
        placeholder={placeholder}
        disabled={disabled}
      >
        {inputNode}
      </Form.Item>
    );
  };

  const onFieldsChange = () => {
    const disabled = handleDisableBtn(form.getFieldsValue());
    setDisabledSubmitBtn(disabled);
    setError(null);
  };

  const handleSubmit = (values) => {
    setIsLoading(true);
    axiosClient[method](apiUrl, values)
      .then(() => {
        setIsLoading(false);
        handleSuccess(form);
        setDisabledSubmitBtn(true);
      })
      .catch((err) => {
        setError(err.response.data?.message || err?.message);
        setIsLoading(false);
        setDisabledSubmitBtn(true);
      });
  };
  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues]);

  return (
    <Form
      form={form}
      wrapperCol={{ sm: 24, md: 12 }}
      initialValues={initialValues}
      labelAlign="left"
      layout="vertical"
      onFinish={handleSubmit}
      onFieldsChange={onFieldsChange}
      {...formConfig}
    >
      {formItems.map((item) => renderFormItem(item))}
      {error && !isLoading && (
        <Form.Item>
          <Error description={error} />
        </Form.Item>
      )}
      <Form.Item>
        <Button
          disabled={disabledSubmitBtn}
          type="primary"
          htmlType="submit"
          loading={isLoading}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
FormContainer.propTypes = {
  apiUrl: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  formItems: PropTypes.array.isRequired,
  formConfig: PropTypes.object,
  initialValues: PropTypes.object,
  handleSuccess: PropTypes.func,
};

export default FormContainer;
