import { Session } from "next-auth";
import { useRouter } from "next/router";
import React from "react";

interface FeedWrapperProps {
  session: Session;
}

export const FeedWrapper: React.FunctionComponent<FeedWrapperProps> = ({
  session,
}) => {
  const router = useRouter();
  const { id } = router.query;

  const displayClass = id ? "flex" : "hidden";

  return (
    <div className={`${displayClass} w-full flex-col  sm:flex`}>
      {id ? (
        <div className="flex py-20 px-6 text-2xl">{id}</div>
      ) : (
        <div>no conversation</div>
      )}
    </div>
  );
};
