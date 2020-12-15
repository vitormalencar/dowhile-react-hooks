import * as React from "react";

const Header = ({ children }) => (
  <nav className="bg-white shadow px-48 border-b">
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
      <div className="mx-auto my-4">{children}</div>
    </div>
  </nav>
);

const UserForm = ({
  userName: externalUserName,
  initialUserName = externalUserName || "",
  onSubmit,
}) => {
  const [userName, setUserName] = React.useState(initialUserName);

  React.useEffect(() => {
    if (typeof externalUserName === "string") {
      setUserName(externalUserName);
    }
  }, [externalUserName]);

  const handleChange = (e) => {
    setUserName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userName);
  };

  return (
    <Header>
      <form className="flex w-full justify-center" onSubmit={handleSubmit}>
        <input
          className="shadow border border-gray-200 rounded px-4 py-2"
          placeholder="Search by username..."
          value={userName}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="px-4 py-3 border rounded text-gray-800 border-gray-400 hover:border-transparent  hover:bg-gray-800 hover:text-white ml-2"
          disabled={!userName.length}
        >
          search
        </button>
      </form>
    </Header>
  );
};

export { UserForm };
