import db from "./db";

const DatabaseProvider = ({ children }) => {
  // How to connect to DB?
  return <div>{children}</div>;
};

export default DatabaseProvider;
