import { Link } from "react-router-dom";

function HeaderButton({ button }) {
  return (
    <button style={{ marginLeft: 15, marginRight: 15, border: "" }}>
      <Link to={button.RoutingName}> {button.Name}</Link>
    </button>
  );
}

export default HeaderButton;
