import LoopCard from "./loopcard/LoopCard";

const LoopList = ({ loops, refetch }) => {
  return (
    <div className="mt-4 grid grid-cols-3 gap-4">
      {loops.map((loop) => (
        <LoopCard key={loop.id} loop={loop} refetch={refetch} />
      ))}
    </div>
  );
};

export default LoopList;
