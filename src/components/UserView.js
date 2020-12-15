export const UserView = ({ user }) => (
  <div className="rounded rounded-t-lg overflow-hidden shadow w-full my-3">
    <div className="bg-gray-300 h-28 w-full" />

    <div className="flex justify-center  min-h-48 -mt-8">
      <img
        src={user.avatar_url}
        alt="user avatar"
        className="rounded-full border-solid bg-gray-800 border-white border-2 -mt-3 object-cover w-48 h-48 "
      />
    </div>
    <div className="text-center px-3 pb-6 pt-2">
      <h3 className="text-black text-sm bold font-sans">{user.name}</h3>
      <p className="mt-2 font-sans font-light text-grey-dark">{user.bio}</p>
    </div>
    <div className="flex justify-center pb-3 text-grey-dark">
      <div className="text-center mr-3 border-r pr-3">
        <h2>{user.followers}</h2>
        <span>Followers</span>
      </div>
      <div className="text-center">
        <h2>{user.public_repos}</h2>
        <span>Repos</span>
      </div>
    </div>
  </div>
);
