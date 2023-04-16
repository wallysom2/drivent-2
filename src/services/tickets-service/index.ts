import { notFoundError } from "@/errors";
import { TicketStatus } from "@prisma/client";

async function getTicketTypes() {
  const ticketTypes = await ticketRepository.getTicketTypes();
  if (!ticketTypes) {
    throw notFoundError;
  }
    return ticketTypes;
}

async function getTickets(userId) {
    const enrollment = await enrollmentRepository.findWithAdressByUserId(userId);
    if (!enrollment) {
        throw notFoundError();
    }
    const tickets = await ticketRepository.getTicketsByEnrollmentId(enrollment.id);
    if (!tickets) {
        throw notFoundError();
    }
    return tickets;

async function createTicket(userId, ticketTypeId) {
    const enrollment = await enrollmentRepository.findWithAdressByUserId(userId);
    if (!enrollment) {
        throw notFoundError();
    }
    const ticketType = await ticketRepository.getTicketTypeById(ticketTypeId);
    if (!ticketType) {
        throw notFoundError();
    }
    const ticketData = {
        ticketTypeId,
        enrollmentId: enrollment.id,
        status: TicketStatus.RESERVED
    }

    await ticketRepository.createTicket(ticketData);
    const ticket = await ticketRepository.findTicketByEnrollmentIdAndTicketTypeId(enrollment.id, ticketTypeId);

    return ticket;
}

const ticketService = {
    getTicketTypes,
    getTickets,
    createTicket
};

export default ticketService;