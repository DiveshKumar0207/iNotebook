import Navbar from "./Navbar";
import PropType from "prop-types";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

Layout.propTypes = {
  children: PropType.node.isRequired,
};

export default Layout;
