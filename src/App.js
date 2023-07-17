import "devextreme/dist/css/dx.dark.css";
import "./App.css";
import ArrayStore from "devextreme/data/array_store";
import Button from "devextreme-react/button";
import DataGrid, { Column, Selection } from "devextreme-react/data-grid";

import { useState } from "react";
import { companies } from "./companies";

const store = new ArrayStore({
  key: "ID",
  data: companies,
});

const columns = ["CompanyName", "City", "State", "Phone", "Fax"];

function App() {
  const [show, setShow] = useState(true);
  const [selected, setSelected] = useState([]);

  const onClick = () => {
    setShow(!show);
  };
  const handleSelection = (e) => {
    setSelected(e.selectedRowKeys);
  };

  return (
    <div className="App">
      <Button text="Toggle State" type="success" onClick={onClick} />
      <DataGrid
        className="datagrid"
        dataSource={store}
        showBorders={true}
        onSelectionChanged={handleSelection}
      >
        <Selection mode="multiple" />
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
