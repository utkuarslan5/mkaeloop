// ActionButtons.jsx
import React from 'react';
import {
  deleteLoop,
  deactivateLoop,
  joinLoop,
  watchLoop,
  leaveLoop,
  unwatchLoop,
} from 'wasp/client/operations';

const ActionButtons = ({
  loop,
  user,
  isCreator,
  isParticipant,
  isWatcher,
  refetch,
  setShowCheckinPopup,
}) => {
  const handleDeleteLoop = async () => {
    try {
      await deleteLoop({ loop, user });
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLeaveLoop = async () => {
    try {
      await leaveLoop({ loop, user });
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const handleJoinLoop = async () => {
    try {
      await joinLoop({ loop, user });
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const handleWatchLoop = async () => {
    try {
      await watchLoop({ loop, user });
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnwatchLoop = async () => {
    try {
      await unwatchLoop({ loop, user });
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="absolute top-2 right-2 flex">
      {isCreator && (
        <button
          className="bg-red-500 text-white px-1 py-1 rounded mr-1"
          onClick={handleDeleteLoop}
        >
          Remove
        </button>
      )}
      {!isCreator && (
        <div>
          {isParticipant ? (
            <div>
              <button
                className="bg-red-500 text-white px-1 py-1 rounded mr-1"
                onClick={handleLeaveLoop}
              >
                Leave
              </button>
              <button
                className="bg-green-500 text-white px-1 py-1 rounded mr-1"
                onClick={() => setShowCheckinPopup(true)}
              >
                Checkin
              </button>
            </div>
          ) : (
            <button
              className="bg-green-500 text-white px-1 py-1 rounded mr-1"
              onClick={handleJoinLoop}
            >
              Join
            </button>
          )}
          {isWatcher ? (
            <button
              className="bg-blue-500 text-white px-1 py-1 rounded"
              onClick={handleUnwatchLoop}
            >
              Unwatch
            </button>
          ) : (
            <button
              className="bg-blue-500 text-white px-1 py-1 rounded"
              onClick={handleWatchLoop}
            >
              ️ Watch
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ActionButtons;