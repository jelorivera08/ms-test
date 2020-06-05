import "./signup.css";
import React, { useState } from "react";
import { Tab } from "semantic-ui-react";
import NewToCarly from "../newToCarly";
import Login from "../login";

import "./signup.css";

const panes = [
  {
    menuItem: "New to Carly?",
    render: (props) => (
      <Tab.Pane>
        <NewToCarly {...props} />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Log in",
    render: () => (
      <Tab.Pane>
        <Login />
      </Tab.Pane>
    ),
  },
];

const Signup = () => {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <div className="Login">
      <div className="tabContainer flex justify-center">
        <Tab
          style={{
            width: "25rem",
          }}
          onTabChange={(e, { activeIndex }) => setTabIndex(activeIndex)}
          setTabIndex={setTabIndex}
          activeIndex={tabIndex}
          panes={panes}
        />
      </div>
    </div>
  );
};

export default Signup;
