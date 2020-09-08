const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/exerciseDB")

const Schema = mongoose.Schema

const solarSystemSchema = new Schema({
    starName: String,
    planets: [{ type: Schema.Types.ObjectId, ref: 'Planet' }]
})

const planetSchema = new Schema({
    name: String,
    system: { type: Schema.Types.ObjectId, ref: 'SolarSystem' },
    visitors: [{ type: Schema.Types.ObjectId, ref: 'Visitor' }]
})

const visitorSchema = new Schema({
    name: String,
    homePlanet: { type: Schema.Types.ObjectId, ref: 'Planet' },
    visitedPlanets: [{ type: Schema.Types.ObjectId, ref: 'Planet' }]
})

const SolarSystem = mongoose.model("SolarSystem", solarSystemSchema)
const Planet = mongoose.model("Planet", planetSchema)
const Visitor = mongoose.model("Visitor", visitorSchema)

const sos1 = new SolarSystem({
    starName: "sun system",
    planets: []
})
const sos2 = new SolarSystem({
    starName: "electric system",
    planets: []
})
const sos3 = new SolarSystem({
    starName: "water system",
    planets: []
})
const p1 = new Planet({
    name: "Narkis",
    system: sos1,
    visitors: []
})
const p2 = new Planet({
    name: "Vered",
    system: sos2,
    visitors: []
})
const p3 = new Planet({
    name: "Alon Tree",
    system: sos3,
    visitors: []
})

const v1 = new Visitor({
    name: "roi ben ishai",
    homePlanet: p1,
    visitedPlanets: []
})
const v2 = new Visitor({
    name: "shir mor ben ishai",
    homePlanet: p2,
    visitedPlanets: []
})
const v3 = new Visitor({
    name: "Cristiano Ronaldo",
    homePlanet: p3,
    visitedPlanets: []
})



// p1.visitors.push(v1)
// p1.visitors.push(v2)

// p2.visitors.push(v2)
// p2.visitors.push(v3)

// p3.visitors.push(v1)
// p3.visitors.push(v2)


// v1.visitedPlanets.push(p1)
// v1.visitedPlanets.push(p2)

// v2.visitedPlanets.push(p2)
// v2.visitedPlanets.push(p3)

// v3.visitedPlanets.push(p1)
// v3.visitedPlanets.push(p3)

// sos1.planets.push(p1)
// sos1.planets.push(p2)

// sos2.planets.push(p2)
// sos2.planets.push(p3)

// sos3.planets.push(p1)
// sos3.planets.push(p3)

// const planets = [p1, p2, p3]
// const visitors = [v1, v2,v3]
// const solarSystem = [sos1, sos2, sos3]

// planets.forEach(p => p.save())
// visitors.forEach(v => v.save())
// solarSystem.forEach(s => s.save())


// ex1
Visitor.find({}).populate('visitedPlanets').exec(function (err, visitors) {
    visitors.forEach(v =>console.log(v.visitedPlanets)) ;
})


// ex2
Planet.find({}).populate("visitors").exec(function (err, planets) {
    planets.forEach(p => console.log(p.visitors))
})

//ex3
SolarSystem.find({}).populate({
    path: 'planets',
    populate: {
        path: 'visitedPlanets'
    }
}).exec(function (err, solarSystem) {
    solarSystem.forEach(vp => console.log(vp.planets))
})  


//ex4
Visitor.find({}).populate({
    path:"homePlanet",
    populate:{
        path:"system"
    }
}).exec(function(err,visitors){
    visitors.forEach(v=>console.log(v.homePlanet.system.starName))
})

//ex5
Planet.find({}).populate("system visitors").exec(function(err,planets){
    planets.forEach(p=>{
        console.log(p.system.starName);
        console.log(p.visitors);
    })
})
