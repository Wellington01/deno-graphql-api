import db from "../db/mongodb.ts";

class UserRepository {
  private usersCollection = db.collection("users");

  async getAll() {
    const users = await this.usersCollection.find();

    return users.map((user: any) => {
      const {
        _id: { $oid: id },
      } = user;

      user.id = id;
      return user;
    });
  }

  async getById(id: string) {
    const user = await this.usersCollection.findOne({
      _id: { $oid: id },
    });

    return user;
  }

  async create(user: any) {
    const { $oid: id } = await this.usersCollection.insertOne(user);

    return id;
  }
}

export default UserRepository;
