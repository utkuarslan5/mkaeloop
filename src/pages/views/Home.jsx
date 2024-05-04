import { useAuth } from "wasp/client/auth";
import LoopForm from "../components/looplist/LoopForm";
import LoopList from "../components/looplist/LoopList";
import { useQuery } from "wasp/client/operations";
import {
  getActiveLoops,
} from "wasp/client/operations";

const HomePage = () => {
  const { data: loops, error, isLoading, refetch } = useQuery(getActiveLoops);
  const { data: user } = useAuth();
  
  if (isLoading) {
    return <div>Waiting for the loops to jump through the hoops... 🐰🔄</div>;
  }

  if (error) {
    return <div>Oops, the loops got tangled! 🥴🌀 {error.message}</div>;
  }

  return (
    <div className="p-4">
      <LoopForm />
      <LoopList user={user} loops={loops} />
    </div>
  );
};

export default HomePage;


