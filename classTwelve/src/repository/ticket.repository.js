import { TICKET_DTO } from "../DTO/manager.dto.js"

export default class TicketRepository {

    constructor(DAO) {
        this.DAO = DAO;
    }

    async createTicket(ticket) {
        let ticketDBFormat = await TICKET_DTO.ticket(ticket);
        return await this.DAO.addTicket(ticketDBFormat);
    }
}