import "devextreme/dist/css/dx.dark.css";
import "./App.css";
import DataGridOnHooks from "./DataGridOnHooks";
import DataGridOnComponents from "./DataGridOnClasses";

function App() {
  return (
    <>
      <h2>DataGrid on Hooks</h2>
      <DataGridOnHooks />
      <h2>DataGrid on Classes</h2>
      <DataGridOnComponents />
    </>
  );
}

export default App;
