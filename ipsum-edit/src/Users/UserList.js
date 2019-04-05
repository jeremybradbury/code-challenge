import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import _ from "lodash";

const userDataFetcher = {
  fetch(page, size) {
    return fetch("/users/list")
      .then(res => res.json())
      .then(users => {
        return {
          items: _.slice(users, (page - 1) * size, (page - 1) * size + size),
          total: users.length,
        };
      });
  },
};

const cellEditProp = {
  mode: "click",
  blurToSave: true,
};

class DataGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      totalSize: 0,
      page: 1,
      sizePerPage: 10,
    };
    this.fetchData = this.fetchData.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSizePerPageChange = this.handleSizePerPageChange.bind(this);
    this.handleAddRow = this.handleAddRow.bind(this);
    this.handleDeleteRow = this.handleDeleteRow.bind(this);
    this.handleCellEdit = this.handleCellEdit.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData(page = this.state.page, sizePerPage = this.state.sizePerPage) {
    userDataFetcher.fetch(page, sizePerPage).then(data => {
      this.setState({
        items: data.items,
        totalSize: data.total,
        page,
        sizePerPage,
      });
    });
  }
  handleCellEdit(user, key, value) {
    let u = { [key]: value };
    fetch(`/users/${user.id}/update`, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(u),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(() => this.fetchData());
  }
  handleDeleteRow(id) {
    fetch(`/users/${id}/destroy`)
      .then(response => response.json())
      .then(() => this.fetchData());
  }
  handleAddRow(user) {
    fetch("/users/create", {
      method: "POST", // or 'PUT'
      body: JSON.stringify(user),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => this.fetchData());
  }
  handlePageChange(page, sizePerPage) {
    this.fetchData(page, sizePerPage);
  }

  handleSizePerPageChange(sizePerPage) {
    // When changing the size per page always navigating to the first page
    this.fetchData(1, sizePerPage);
  }
  render() {
    const options = {
      onPageChange: this.handlePageChange,
      onAddRow: this.handleAddRow,
      onDeleteRow: this.handleDeleteRow,
      onCellEdit: this.handleCellEdit,
      onSizePerPageList: this.handleSizePerPageChange,
      page: this.state.page,
      sizePerPage: this.state.sizePerPage,
    };
    return (
      <BootstrapTable
        version="4"
        keyField="id"
        data={this.state.items}
        cellEdit={cellEditProp}
        selectRow={{ mode: "radio" }}
        deleteRow
        insertRow
        options={options}
        fetchInfo={{ dataTotalSize: this.state.totalSize }}
        remote
        printable
        pagination
        striped
        hover
      >
        <TableHeaderColumn dataField="email" dataAlign="center">
          Email
        </TableHeaderColumn>
        <TableHeaderColumn dataField="message" dataAlign="center">
          Message
        </TableHeaderColumn>
        <TableHeaderColumn dataField="foo" dataAlign="center">
          Foo
        </TableHeaderColumn>
        <TableHeaderColumn dataField="bar" dataAlign="center">
          Bar
        </TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default DataGrid;
