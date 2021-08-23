import Database from "./db";

const DatabaseProvider = ({ children }) => {
	 const instance = Database.connect()

  // How to connect to DB?
  return <div>{children}</div>;
};

export default DatabaseProvider;
