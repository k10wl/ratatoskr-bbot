import { RegisteredUser } from "@src/models";

export async function findOneRegisteredUserById(id: number | undefined) {
  return RegisteredUser.findOne({
    telegram_user_id: id,
  });
}
