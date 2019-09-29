import React, { useState, useEffect } from "react";
import axios from "axios";
import UserInput from "../Modals/UserInput";
import { Layout, Popconfirm, Table, Button } from "antd";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/core";

const { Content } = Layout;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/users",
      crossDomain: true
      // params: { user: "asd" }
    })
      .then(function(response) {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      sorter: (a, b) => {
        return a.firstName.localeCompare(b.firstName);
      },
      sortDirections: ["descend", "ascend"]
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      sorter: (a, b) => {
        return a.lastName.localeCompare(b.lastName);
      },
      sortDirections: ["descend", "ascend"]
    },
    {
      title: "Country",
      dataIndex: "country",
      sorter: (a, b) => {
        return a.country.localeCompare(b.country);
      },
      sortDirections: ["descend", "ascend"]
    },
    {
      title: "City",
      dataIndex: "city",
      defaultSortOrder: "descend",
      sorter: (a, b) => {
        return a.city.localeCompare(b.city);
      },
      sortDirections: ["descend", "ascend"]
    },
    {
      title: "Address",
      dataIndex: "address",
      sorter: (a, b) => {
        return a.address.localeCompare(b.address);
      },
      sortDirections: ["descend", "ascend"]
    },
    {
      title: "Address 2",
      dataIndex: "address2",
      sorter: (a, b) => {
        return a.address_2.localeCompare(b.address_2);
      },
      sortDirections: ["descend", "ascend"]
    },
    {
      title: "Legal",
      dataIndex: "legal",
      sorter: (a, b) => {
        return a.legal.localeCompare(b.legal);
      },
      sortDirections: ["descend", "ascend"]
    },
    {
      title: "Package",
      dataIndex: "packagee",
      sorter: (a, b) => {
        return a.packagee.localeCompare(b.packagee);
      },
      sortDirections: ["descend", "ascend"]
    },
    {
      title: "Edit",
      dataIndex: "Edit",
      render: (text, record) => (
        <UserInput update={handleUpdate} name="Edit a user" user={record} />
      )
    },
    {
      title: "Delete",
      dataIndex: "Delete",
      render: (text, record) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => handleDelete(record)}
        >
          <Button type="danger">Delete</Button>
        </Popconfirm>
      )
    }
  ];

  let override = css`
    display: block;
    margin: 0 auto;
  `;

  let handleDelete = user => {
    axios.delete("http://localhost:5000/api/users", {
      data: { id: user._id }
    });
    let newArray = users.filter(function(us) {
      return user._id !== us._id;
    });
    setUsers(newArray);
  };

  let handleAdd = user => {
    let newUser = { ...user };
    let usersNew = [...users];
    usersNew.push(newUser);
    setUsers(usersNew);
  };

  let handleUpdate = user => {
    let usersNew = [...users];
    let index = usersNew.findIndex(k => k._id === user._id);
    usersNew[index] = user;
    setUsers(usersNew);
  };

  return !loading ? (
    <Content style={{ padding: "0 50px" }}>
      <div style={{ textAlign: "right" }}>
        <UserInput add={handleAdd} name="Add a user" user={1} />
      </div>
      <ClipLoader
        css={override}
        sizeUnit={"px"}
        size={150}
        color={"#123abc"}
        loading={loading}
      />
      <div
        style={{
          background: "#fff",
          paddingTop: 24,
          paddingBottom: 24,
          minHeight: 280
        }}
      >
        <Table
          columns={columns}
          dataSource={users}
          rowKey={record => record._id}
        />
      </div>
    </Content>
  ) : (
    ""
  );
};

export default Users;
