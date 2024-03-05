import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "/lib/mongoDB";
import User from "/model/User";
import { compare } from "bcryptjs";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        await connectToDB();
        const user = await User.findOne({
          email: credentials.email,
        });

        if (!user) {
          throw new Error("User not found");
        }

        const isPasswordCorrect = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Incorrect password");
        }

        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
