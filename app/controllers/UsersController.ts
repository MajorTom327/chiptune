import userDao from "~/daos/UserDao";

export class UserController {
  getUserPage(page: number) {
    return userDao.getUserPage(page);
  }

}

export const userController = new UserController();
export default userController;
