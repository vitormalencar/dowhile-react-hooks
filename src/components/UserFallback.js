import * as React from "react";
import { UserView } from "./UserView";

export const UserFalback = ({ userName }) => {
  const initialName = React.useRef(userName).current;
  const fallbackData = {
    followers: 0,
    public_repos: 0,
    name: initialName,
    bio: "loading...",
    avatar_url: "/img/github.png",
  };

  return <UserView user={fallbackData} />;
};
