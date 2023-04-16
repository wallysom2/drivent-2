import { Request, Response } from 'express';
import httpStatus from 'http-status';
import getTicketTypes from '@/services/tickets-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function getTicketTypes(req: Request, res: Response) {
  try {
    const ticketTypes = await ticketService.getTicketTypes();
    return res.status(httpStatus.OK).send(ticketTypes);
    }
  catch (error) {
    return res.status(httpStatus.NOT_FOUND);
  }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const tickets = await ticketService.getTickets(userId);
    return res.status(httpStatus.OK).send(tickets);
  }
  catch (error) {
    return res.status(httpStatus.NOT_FOUND);
  }
}
