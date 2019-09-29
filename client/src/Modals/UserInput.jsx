import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Form, Input, Button, Col, Select, Radio } from "antd";

const UserInput = ({ name, add, user, update, ...props }) => {
  const [visible, setVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [legal, setLegal] = useState("Individual");
  const [packagee, setPackagee] = useState("Standard package");

  useEffect(() => {
    props.form.validateFields();
  }, []);

  useEffect(() => {
    if (user !== 1) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setCountry(user.country);
      setCity(user.city);
      setAddress(user.address);
      setAddress2(user.address2);
      setLegal(user.legal);
      setPackagee(user.packagee);
    }
  }, [user]);

  const InputGroup = Input.Group;
  const { Option } = Select;

  let handleOk = () => {
    setVisible(false);
  };

  const {
    getFieldDecorator,
    getFieldsError,
    getFieldError,
    isFieldTouched
  } = props.form;

  // Only show error after a field is touched.
  const firstNameError =
    isFieldTouched("firstName") && getFieldError("firstName");
  const lastNameError = isFieldTouched("lastName") && getFieldError("lastName");
  const countryError = isFieldTouched("country") && getFieldError("country");
  const cityError = isFieldTouched("city") && getFieldError("city");
  const addressError = isFieldTouched("address") && getFieldError("address");
  const legalError = isFieldTouched("legal") && getFieldError("legal");
  const packageeError = isFieldTouched("packagee") && getFieldError("packagee");

  function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  let data = {
    firstName: firstName,
    lastName: lastName,
    country: country,
    city: city,
    address: address,
    address2: address2,
    legal: legal,
    packagee: packagee
  };

  let handleSubmit = e => {
    e.preventDefault();
    if (user !== 1) {
      axios({
        method: "put",
        url: `http://localhost:5000/api/users/${user._id}`,
        data: data,
        crossDomain: true
      })
        .then(function(response) {
          handleOk();
          console.log(response.data);
          update(response.data);
          handleOk();
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      add(data);
      axios({
        method: "post",
        url: "http://localhost:5000/api/users",
        data: data,
        crossDomain: true
      })
        .then(function(response) {
          add(response.data);
          handleOk();
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };

  return user ? (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        {name}
      </Button>
      <Modal
        title={name}
        visible={visible}
        onOk={handleOk}
        onCancel={() => setVisible(false)}
        width="600px"
        footer={[
          <Button key="back" onClick={handleOk}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            disabled={hasErrors(getFieldsError())}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        ]}
      >
        <div>
          <Form onSubmit={handleSubmit}>
            <InputGroup compact>
              <Col span={10}>
                <Form.Item
                  validateStatus={firstNameError ? "error" : ""}
                  help={firstNameError || ""}
                >
                  {getFieldDecorator("firstName", {
                    initialValue: user.firstName,
                    rules: [
                      {
                        required: true,
                        message: "Please input your first name!"
                      }
                    ]
                  })(
                    <Input
                      placeholder="First name"
                      onChange={e => setFirstName(e.target.value)}
                      setfieldsvalue={firstName}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  validateStatus={lastNameError ? "error" : ""}
                  help={lastNameError || ""}
                >
                  {getFieldDecorator("lastName", {
                    initialValue: user.lastName,
                    rules: [
                      {
                        required: true,
                        message: "Please input your last name!"
                      }
                    ]
                  })(
                    <Input
                      type="text"
                      placeholder="Last name"
                      onChange={e => setLastName(e.target.value)}
                      setfieldsvalue={lastName}
                    />
                  )}
                </Form.Item>
              </Col>
            </InputGroup>
            <InputGroup compact>
              <Col span={10}>
                <Form.Item
                  validateStatus={countryError ? "error" : ""}
                  help={countryError || ""}
                >
                  {getFieldDecorator("country", {
                    initialValue: user.country,
                    rules: [
                      {
                        required: true,
                        message: "Please input your country!"
                      }
                    ]
                  })(
                    <Input
                      placeholder="Country"
                      onChange={e => setCountry(e.target.value)}
                      setfieldsvalue={country}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  validateStatus={cityError ? "error" : ""}
                  help={cityError || ""}
                >
                  {getFieldDecorator("city", {
                    initialValue: user.city,
                    rules: [
                      {
                        required: true,
                        message: "Please input your city!"
                      }
                    ]
                  })(
                    <Input
                      type="text"
                      placeholder="City"
                      onChange={e => setCity(e.target.value)}
                      setfieldsvalue={city}
                    />
                  )}
                </Form.Item>
              </Col>
            </InputGroup>
            <InputGroup compact>
              <Col span={10}>
                <Form.Item
                  validateStatus={addressError ? "error" : ""}
                  help={addressError || ""}
                >
                  {getFieldDecorator("address", {
                    initialValue: user.address,
                    rules: [
                      {
                        required: true,
                        message: "Please input your address!"
                      }
                    ]
                  })(
                    <Input
                      placeholder="Address"
                      onChange={e => setAddress(e.target.value)}
                      setfieldsvalue={address}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item>
                  {getFieldDecorator("address2", {
                    initialValue: user.address2,
                    rules: [
                      {
                        required: false,
                        message: "Please input your address 2!"
                      }
                    ]
                  })(
                    <Input
                      type="text"
                      placeholder="Address 2"
                      onChange={e => setAddress2(e.target.value)}
                      setfieldsvalue={address2}
                    />
                  )}
                </Form.Item>
              </Col>
            </InputGroup>
            <InputGroup compact>
              <Col span={10}>
                <Form.Item
                  validateStatus={legalError ? "error" : ""}
                  help={legalError || ""}
                >
                  {getFieldDecorator("legal", {
                    initialValue: user.legal ? user.legal : "Individual",
                    rules: [
                      {
                        required: true,
                        message: "Please input your legal status!"
                      }
                    ]
                  })(
                    <Select
                      style={{ width: 200 }}
                      placeholder="Legal"
                      onChange={e => setLegal(e)}
                      setfieldsvalue={legal}
                    >
                      <Option value="Individual">Individual</Option>
                      <Option value="Company">Company</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  validateStatus={packageeError ? "error" : ""}
                  help={packageeError || ""}
                >
                  {getFieldDecorator("packagee", {
                    initialValue: user.packagee
                      ? user.packagee
                      : "Standard Package",
                    rules: [
                      {
                        required: true,
                        message: "Please input package!"
                      }
                    ]
                  })(
                    <Radio.Group
                      onChange={e => setPackagee(e)}
                      setfieldsvalue={packagee}
                    >
                      <Radio value="Standard Package">Standard Package</Radio>
                      <Radio value="Premium Package">Premium Package</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
              </Col>
            </InputGroup>
          </Form>
        </div>
      </Modal>
    </>
  ) : (
    ""
  );
};

const WrappedDynamicRule = Form.create({ name: "dynamic_rule" })(UserInput);
export default WrappedDynamicRule;
