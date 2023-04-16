import { Request, Response } from 'express';
import httpStatus from 'http-status';
import getTicketTypes from '@/services/tickets-service';

export async function getTicketTypes(req: Request, res: Response) {

  try {
    const ticketTypes = await ticketService.getTicketTypes();
    return res.status(httpStatus.OK).json(ticketTypes);
    }
  catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }

}
