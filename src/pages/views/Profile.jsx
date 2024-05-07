import { useQuery } from "wasp/client/operations";
import { getUserByUsername } from "wasp/client/operations";
import LoopList from "../components/looplist/LoopList";
import { Redirect } from "react-router-dom";
const ProfilePage = (props) => {
  const {
    data: user,
    isLoading,
    error,
    refetch
  } = useQuery(getUserByUsername, {
    username: props.match.params.username,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !user) {
    return <Redirect to="/pages/404" />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <img
                src={user.profileImage || "placeholder.jpg"}
                alt="Profile"
                className="img-fluid rounded-circle mb-4 profile-image"
                style={{ width: "100px", height: "100px" }}
              />
              <h1>{user.username || "Username"}</h1>
              <p>{user.bio || "Bio"}</p>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <LoopList
            loops={user.participatedLoops.filter((loop) => loop.isActive)}
            refetch={refetch}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
