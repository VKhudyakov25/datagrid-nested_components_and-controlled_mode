import "devextreme/dist/css/dx.dark.css";
import "./App.css";
import ArrayStore from "devextreme/data/array_store";
import Button from "devextreme-react/button";
import DataGrid, { Column } from "devextreme-react/data-grid";

import { useCallback, useState, useRef } from "react";
import { companies } from "./companies";

const store = new ArrayStore({
  key: "ID",
  data: companies,
});

const columns = ["CompanyName", "City", "State", "Phone", "Fax"];

function App() {
  const [show, setShow] = useState(true);
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const handleValueChanged = useCallback((v) => {
    setValue(v.value);
  }, []);

  const onClick = () => {
    setShow(!show);
  };

  return (
    <div className="App">
      <Button text="Toggle State" type="success" onClick={onClick} />
      <DataGrid dataSource={store}>
        {columns.map((column, index) =>
          show || column !== "State" ? (
            <Column dataField={column} key={index} visible={true} />
          ) : (
            <Column dataField={column} key={index} visible={false} />
          )
        )}
      </DataGrid>
    </div>
  );
}

export default App;
