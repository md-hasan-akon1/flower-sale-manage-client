import MainLayout from "./Component/Layout/MainLayout";
import PrivetRoute from "./Component/routes/PrivetRoute";

function App() {
  return (
    <PrivetRoute role={undefined}> <MainLayout></MainLayout></PrivetRoute>
     
    
  );
}

export default App;
