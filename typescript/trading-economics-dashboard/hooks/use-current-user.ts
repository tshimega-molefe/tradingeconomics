import { useSession } from "next-auth/react";

// This hook is used to get the current user from the session, within a client-side component.
export const useCurrentUser = () => {
  const session = useSession();

  return session.data?.user;
};
