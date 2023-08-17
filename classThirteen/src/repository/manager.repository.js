import CartRepository from "./cart.repository.js";
import ProductRepository from "./product.repository.js";
import TicketRepository from "./ticket.repository.js";
import UserRepository from "./user.repository.js";
import MessageRepository from "./message.repository.js";

const CART_REPOSITORY = new CartRepository();
const PRODUCT_REPOSITORY = new ProductRepository();
const TICKET_REPOSITORY = new TicketRepository();
const USER_REPOSITORY = new UserRepository();
const MESSAGE_REPOSITORY = new MessageRepository();

export { CART_REPOSITORY, PRODUCT_REPOSITORY, TICKET_REPOSITORY, USER_REPOSITORY, MESSAGE_REPOSITORY }