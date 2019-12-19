import React from "react";

//components
import UserForm from "./components/Form";

//styles
import "./App.scss";

function App() {
  return (
    <div className="App">
      <UserForm />
      <div className="footer">
        <p>
          I customized the wicked cool background on my homepage at{" "}
          <a href="SVGBackgrounds.com">SVGBackgrounds.com</a> .
        </p>
      </div>
    </div>
  );
}

export default App;
