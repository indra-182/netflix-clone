import { NextRequest } from "next/server";
import { connectToDB } from "/lib/mongoDB";
import User from "/model/User";
import { hash } from "bcryptjs";

export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();
    const { username, email, password } = await req.json();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response("User already exists", { status: 409 });
    }

    const hashedPassword = await hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response("Failed to register", { status: 500 });
  }
};
