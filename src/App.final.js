import * as React from "react";
import { UserFalback } from "./components/UserFallback";
import { UserForm } from "./components/UserForm";
import { UserView } from "./components/UserView";
import { fetchGithubUser } from "./userService";

const REQUEST_STATUS = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

const asyncReducer = (state, action) => {
  switch (action.type) {
    case REQUEST_STATUS.PENDING:
      return {
        status: REQUEST_STATUS.PENDING,
        data: null,
        error: null,
      };

    case REQUEST_STATUS.RESOLVED:
      return {
        status: REQUEST_STATUS.RESOLVED,
        data: action.data,
        error: null,
      };

    case REQUEST_STATUS.REJECTED:
      return {
        status: REQUEST_STATUS.REJECTED,
        data: null,
        error: action.error,
      };

    default:
      throw Error(`Unhandled action: ${action.type}`);
  }
};

const useAsync = (initialState) => {
  const [state, dispatch] = React.useReducer(asyncReducer, {
    status: REQUEST_STATUS.IDLE,
    user: null,
    error: null,
    ...initialState,
  });
  const runPromise = React.useCallback((promise) => {
    dispatch({ type: REQUEST_STATUS.PENDING });
    promise.then(
      (data) => dispatch({ type: REQUEST_STATUS.RESOLVED, data }),
      (error) => dispatch({ type: REQUEST_STATUS.REJECTED, error })
    );
  }, []);

  return { ...state, runPromise };
};

const UserInfo = ({ userName }) => {
  const initialRequestStatus = userName
    ? REQUEST_STATUS.PENDING
    : REQUEST_STATUS.IDLE;

  const { status, error, data: user, runPromise } = useAsync({
    status: initialRequestStatus,
  });

  React.useEffect(() => {
    if (!userName) return;
    return runPromise(fetchGithubUser(userName));
  }, [userName, runPromise]);

  switch (status) {
    case REQUEST_STATUS.IDLE:
      return "Submit user";

    case REQUEST_STATUS.PENDING:
      return <UserFalback userName={userName} />;

    case REQUEST_STATUS.RESOLVED:
      return <UserView user={user} />;

    case REQUEST_STATUS.REJECTED:
      return (
        <div>
          There was an error
          <pre style={{ whiteSpace: "normal" }}>{error}</pre>
        </div>
      );

    default:
      throw Error(`Unhandled status: ${status}`);
  }
};

const UserSection = ({ onSelect, userName }) => (
  <div>
    <div className="flex justify-center ">
      <UserInfo userName={userName} />
    </div>
  </div>
);

const App = () => {
  const [userName, setUserName] = React.useState(null);
  const handleSubmit = (newUserName) => setUserName(newUserName);
  const handleSelect = (newUserName) => setUserName(newUserName);

  return (
    <div>
      <UserForm userName={userName} onSubmit={handleSubmit} />
      <hr />
      <div className="m-4">
        <UserSection onSelect={handleSelect} userName={userName} />
      </div>
    </div>
  );
};

export default App;
