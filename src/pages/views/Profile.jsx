import { useQuery } from "wasp/client/operations";
import { getUserByUsername } from "wasp/client/operations";
import LoopList from "../components/looplist/LoopList";
import { Redirect } from "react-router-dom";
import { useAuth, logout } from "wasp/client/auth";
const ProfilePage = (props) => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery(getUserByUsername, {
    username: props.match.params.username,
  });

  const { data: currentUser } = useAuth();

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
            user={currentUser} //the join and leave down't work becasue of the user passed on
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
