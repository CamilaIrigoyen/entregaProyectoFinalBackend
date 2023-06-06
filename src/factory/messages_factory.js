import MessagesDaoMongoDB from "../DAO/messages_DAO.js";
import { database_type } from "../../config/dotenv_config.js";

//SINGLETON

let instance = null;

class MessagesFactory {
  constructor() {
    if (instance) {
      return instance;
    }

    this.messagesDAO = null;
    instance = this;
  }
  
  getDAO() {
    if (!this.messagesDAO) {
      switch(database_type) {
        case "MONGO":
          this.messagesDAO = new MessagesDaoMongoDB();
          break;
        default:
          throw new Error("No se ha definido un tipo de base de datos");
          break;
      }
    }
    return this.messagesDAO;
  }
}

export default new MessagesFactory();