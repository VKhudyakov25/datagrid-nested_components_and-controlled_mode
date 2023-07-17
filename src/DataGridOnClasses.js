import React from "react";
import ArrayStore from "devextreme/data/array_store";
import {
  DataGrid,
  Column,
  Selection,
  FilterRow,
} from "devextreme-react/data-grid";
import Button from "devextreme-react/button";
import { companies } from "./companies";

const columns = ["CompanyName", "City", "State", "Phone", "Fax"];

const store = new ArrayStore({
  key: "ID",
  data: companies,
});

class DataGridOnComponents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      filterRow: true,
      filterState: true,
      selected: [],
    };

    this.toggleState = (option, event) => {
      if (option !== "selected" && option !== "filterState") {
        this.setState((state) => ({
          ...state,
          [option]: !state[option],
        }));
      } else if (option === "selected") {
        this.setState((state) => ({
          ...state,
          [option]: event.selectedRowKeys,
        }));
      } else if (option === "filterState") {
        this.state.filterState
          ? this.dataGridInstance.filter(["State", "=", "Georgia"])
          : this.dataGridInstance.clearFilter();
        this.setState((state) => ({
          ...state,
          [option]: !state[option],
        }));
      }
    };
  }

  onInitialized = (e) => {
    this.dataGridInstance = e.component;
  };

  render() {
    return (
      <div className="App">
        <Button
          text="Toggle State"
          type="success"
          className="buttons"
          onClick={() => this.toggleState("show")}
        />
        <Button
          text="Toggle Filter Row"
          type="success"
          onClick={() => this.toggleState("filterRow")}
          className="buttons"
        />
        <Button
          text="Toggle Filter State"
          type="success"
          onClick={() => this.toggleState("filterState")}
          className="buttons"
        />
        <DataGrid
          dataSource={store}
          showBorders={true}
          className="datagrid"
          onSelectionChanged={(e) => this.toggleState("selected", e)}
          onInitialized={this.onInitialized}
        >
          <Selection mode="multiple" />
          <FilterRow visible={this.state.filterRow} />
          {columns.map((col, index) =>
            this.state.show || col !== "State" ? (
              <Column dataField={col} key={index} visible={true} />
            ) : (
              <Column dataField={col} key={index} visible={false} />
            )
          )}
        </DataGrid>
        <div style={{ marginTop: "10px" }}>
          Selected Records:{" "}
          {this.state.selected.length === 0
            ? "Nothing has been selected"
            : this.state.selected.toString()}
        </div>
      </div>
    );
  }
}

export default DataGridOnComponents;
