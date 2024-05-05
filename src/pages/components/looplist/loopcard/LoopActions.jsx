import React, { useState } from 'react';
import { useAuth } from 'wasp/client/auth';
import ActionButtons from './ActionButtons';
import CheckinPopup from './CheckinPopup';

const LoopActions = ({ loop, isHovered, refetch }) => {
  const { data: user } = useAuth();
  const isCreator = user && loop.createdById === user.id;
  const isParticipant = loop.participants?.some(
    (participant) => participant.id === user?.id
  );
  const isWatcher = loop.watchers?.some((watcher) => watcher.id === user?.id);
  const [showCheckinPopup, setShowCheckinPopup] = useState(false);

  return (
    isHovered &&
    user && (
      <>
        <ActionButtons
          loop={loop}
          user={user}
          isCreator={isCreator}
          isParticipant={isParticipant}
          isWatcher={isWatcher}
          refetch={refetch}
          setShowCheckinPopup={setShowCheckinPopup}
        />
        {showCheckinPopup && (
          <CheckinPopup
            loop={loop}
            user={user}
            refetch={refetch}
            onClose={() => setShowCheckinPopup(false)}
          />
        )}
      </>
    )
  );
};

export default LoopActions;
