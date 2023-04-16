import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getTicketTypes, getTickets, postCreateTicket } from '@/controllers/tickets-controller';

const ticketsRouter = Router();
ticketsRouter.all('/*', authenticateToken)
.get('/types')
.get('')
.post('');

export { ticketsRouter };
