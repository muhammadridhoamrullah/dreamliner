import { comparePassword } from "../helpers/bcrypt";
import { signToken } from "../helpers/jwt";
import { findUserByEmail } from "../models/User";
import { User } from "../types/userTypes";

const COLL_NAME = "users";

type InputLoginUser = {
  email: string;
  password: string;
};

export async function login(input: InputLoginUser) {
  // Find user by email
  const user =
    ((await findUserByEmail(input.email)) as unknown as User) || null;

  if (!user) {
    throw new Error("User not found");
  }

  //   Check password

  const checkPassword = await comparePassword(input.password, user.password);

  if (!checkPassword) {
    throw new Error("Invalid password");
  }

  //   Buat access_token

  const access_token = signToken({
    UserId: user._id,
  });

  return access_token;
}
