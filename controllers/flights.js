//new s.4.3 import flight from models 
import { Flight } from "../models/flight.js"

import { Destination } from '../models/destination.js'


// new s.4.4 export new flight
export{
    
    newFlight as new, 
    
    // create s.5.1 export create 
    create,
    
    // index s.6.2 export index
    index,
    
    // show s.7.3 export show
    show,
    
    // ticket s.8.4
    createTicket,
   
    addToDestination
}


// index s.6.3 make function 
function index(req, res){
    
    Flight.find({}, function(err, flights){
        
        res.render('flights/index', {
            
            flights: flights,
            
            title: 'All Flights'

        })
    })
}
// new s.4.4 make newflight function 

function newFlight(req, res){
    
    res.render('flights/new', {
    // index s.6.4 add title
       
        title: "ADD FLIGHT"
})
}

// create s.5.2 make create function 
function create(req, res) {
    
    for (let key in req.body) {
     
        if (req.body[key] === '') delete req.body[key]
    }
    
    const flight = new Flight(req.body)
    
    if (!flight.departs){
    
        flight.departs = new Date()
    
        flight.departs.setFullYear(flight.departs.getFullYear()+1)
    }
    
    flight.save(function(err) {
    
        if (err) return res.redirect('/flights/new')
    
        res.redirect(`/flights/${flight._id}`)
    })
  }


// show s.7.2 make a show function
function show(req, res) {
    
    Flight.findById(req.params.id)
    
    .populate('destinations').exec(function(err, flight){
    
        Destination.find({_id: {$nin: flight.
            destinations}}, function(err, destinations) {
        
                res.render('flights/show', {
         
                    title: 'Flight Detail', 
         
                    flight: flight,
         
                    destinations: destinations
        })
      })
    })
  }



function createTicket(req, res) {
    
    Flight.findById(req.params.id, function(err, flight) {
    
        flight.tickets.push(req.body)
    
        flight.save(function(err) {
         res.redirect(`/flights/${flight._id}`)
       })
     })
   }


function addToDestination (req, res) {

    Flight.findById(req.params.id, function(err, flight) {

        flight.destination.push(req.body.destinationId) 
    
        flight.save(function(err) {
    
            res.redirect(`/flights/${flight._id}`)
    })
  })
}
