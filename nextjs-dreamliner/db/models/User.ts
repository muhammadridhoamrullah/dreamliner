import { getDb } from "../config";

const COLL_NAME = "users";

export async function findUserByEmail(email: string) {
  const db = await getDb();

  const user = await db.collection(COLL_NAME).findOne({
    email,
  });

  return user;
}

export async function checkPassword(password: string, hashedPassword: string) {
    
}