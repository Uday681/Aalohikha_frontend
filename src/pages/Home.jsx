import { Route, Routes } from "react-router-dom";
import Quotation from "./Quotation";

const Home = () => {

  return (
    <div className="container mx-auto p-4">
       <Routes>
        <Route path="/" element={<Quotation />} />
      </Routes>
    </div>
  );
};

export default Home;