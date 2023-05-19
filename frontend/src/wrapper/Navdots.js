import React from "react";

const Navdots = ({ active }) => (
  <div className="app__navigation">
    {["home", "feature", "contacts", "foods", "faq", "create"].map(
      (item, index) => (
        <a
          href={`#${item}`}
          key={item + index}
          className="app__navigation-dot"
          style={active === item ? { backgroundColor: "#f00" } : {}}
        />
      )
    )}
  </div>
);

export default Navdots;
