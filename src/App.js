import "devextreme/dist/css/dx.dark.css";
import "./App.css";
import ArrayStore from "devextreme/data/array_store";
import Button from "devextreme-react/button";
import DataGrid, {
  Column,
  Selection,
  FilterRow,
} from "devextreme-react/data-grid";

import { useState, useRef } from "react";
import { companies } from "./companies";

const store = new ArrayStore({
  key: "ID",
  data: companies,
});

const columns = ["CompanyName", "City", "State", "Phone", "Fax"];

function App() {
  const [show, setShow] = useState(true);
  const [filterRow, serFilterRow] = useState(true);
  const [filterState, setFilterState] = useState(true);
  const [selected, setSelected] = useState([]);

  const toggleState = () => {
    setShow(!show);
  };
  const handleSelection = (e) => {
    setSelected(e.selectedRowKeys);
  };

  const toggleFilterRow = () => {
    serFilterRow(!filterRow);
  };

  const toggleFilterState = () => {
    let instance = dataGrid.current.instance;
    filterState
      ? instance.filter(["State", "=", "Georgia"])
      : instance.clearFilter();
    setFilterState(!filterState);
  };
  const filterStateButton = useRef(null);

  const dataGrid = useRef(null);
  return (
    <div className="App">
      <Button
        text="Toggle State"
        type="success"
        onClick={toggleState}
        className="buttons"
      />
      <Button
        text="Toggle Filter Row"
        type="success"
        onClick={toggleFilterRow}
        className="buttons"
      />
      <Button
        text="Toggle Filter State"
        type="success"
        onClick={toggleFilterState}
        className="buttons"
      />
      <DataGrid
        className="datagrid"
        dataSource={store}
        showBorders={true}
        onSelectionChanged={handleSelection}
        ref={dataGrid}
      >
        <Selection mode="multiple" />
        <FilterRow visible={filterRow} />
        {columns.map((column, index) =>
          show || column !== "State" ? (
            <Column dataField={column} key={index} visible={true} />
          ) : (
            <Column dataField={column} key={index} visible={false} />
          )
        )}
      </DataGrid>
      <div style={{ marginTop: "10px" }}>
        Selected Records:{" "}
        {selected.length === 0
          ? "Nobody has been selected"
          : selected.toString()}
      </div>
    </div>
  );
}

export default App;
