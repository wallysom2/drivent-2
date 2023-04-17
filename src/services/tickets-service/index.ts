import { notFoundError } from "@/errors";
import { TicketStatus } from "@prisma/client";
import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";

export async function getTicketTypes() {
  const ticketTypes = await ticketRepository.getTicketTypes();
  if (!ticketTypes) {
    throw notFoundError;
  }
    return ticketTypes;
};

export async function getTicketsById(userId: number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enrollment) {
        throw notFoundError();
    }
    const tickets = await ticketRepository.getTicketsByEnrollmentId(enrollment.id);
    if (!tickets) {
        throw notFoundError();
    }
    return tickets;
};

export async function createTicket(userId: number, ticketTypeId: number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
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
    const ticket = await ticketRepository.getTicketsByEnrollmentId(enrollment.id);

    return ticket;
};

const ticketService = {
    getTicketTypes,
    getTicketsById,
    createTicket,
}; 

export default ticketService;