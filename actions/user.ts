import { options } from "/app/api/auth/[...nextauth]/option";
import { getServerSession } from "next-auth";
import { connectToDB } from "/lib/mongoDB";
import User from "/model/User";

export const fetchMyFavorites = async () => {
  const session = await getServerSession(options);

  if (!session?.user?.email) {
    throw new Error("No user log in");
  }

  await connectToDB();

  const user = await User.findOne({ email: session?.user?.email });

  if (!user) {
    throw new Error("No user found");
  }

  return user.favorites;
};
