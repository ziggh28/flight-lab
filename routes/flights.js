import { Router } from 'express'

const router = Router()

// new s.4.1. import controller dir 
import * as flightCtrl from '../controllers/flights.js'

export {
  router
}


router.get('/', flightCtrl.index)

router.get('/new', flightCtrl.new)

router.get('/:id', flightCtrl.show)

router.post('/', flightCtrl.create)

router.post('/:id/ticket', flightCtrl.createTicket)

router.post('/:id/destination', flightCtrl.addToDestination)




