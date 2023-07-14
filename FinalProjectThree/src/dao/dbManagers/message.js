import { messageModel } from "../models/message.model.js";

export default class Message {
  async create(data) {
    let { user, message, id } = data;
    let result = await messageModel.create({ user, message, id });
    return result;
  }

  async getAll() {
    let result = await messageModel.find().lean();
    return result;
  }
}