import { useState } from "react";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Header from "./components/Header";


function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="body">
      <Header searchValue={searchValue} onSearchCallback={setSearchValue}/>
      <Content searchValue={searchValue} />
      <Footer />
    </div>
  );
}

export default App;