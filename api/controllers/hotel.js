import Hotel from "../models/Hotel.js"

//Create
export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body)
    try {
        const savedHotel = await newHotel.save()
        res.json(savedHotel)
    } catch (err) {
        next(err)
    }
}

//Update
export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        // set to update in mongoDB & new:true to show Json Results when update on Post
        res.json(updatedHotel)
    } catch (err) {
        next(err)
    }
}

//Delete
export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.json("Hotel has been deleted.")
    } catch (err) {
        next(err)
    }
}

//Get
export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.json(hotel)
    } catch (err) {
        next(err)
    }
}

//GetAll
export const getAllHotels = async (req, res, next) => {
    const { min, max, ...others } = req.query
    let numMax = max * 1
    numMax = numMax +1
    let strMax = numMax.toString()

    try {
        const hotels = await Hotel.find({ ...others, cheapestPrice: { $gt: min-1 || 1, $lt: strMax || 999 }, }).limit(req.query.limit)
        res.json(hotels)
    } catch (err) {
        next(err)
    }
}

//Count City
export const countByCity = async (req, res, next) => {
    //Use split() method because req.query.cities return string not array
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map((city) => {
            // return Hotel.find({city:city}).length        time over
            return Hotel.countDocuments({ city: city })        // countDocuments is method from mongoDB
        }))
        res.json(list)
    } catch (err) {
        next(err)
    }
}
//Count Type
export const countByType = async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type: await "hotel" })
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" })
        const resortCount = await Hotel.countDocuments({ type: "resortCount" })
        const villaCount = await Hotel.countDocuments({ type: "villa" })
        const cabinCount = await Hotel.countDocuments({ type: "cabin" })

        res.json([
            { type: "hotel", count: hotelCount },
            { type: "apartment", count: apartmentCount },
            { type: "resortCount", count: resortCount },
            { type: "villa", count: villaCount },
            { type: "cabin", count: cabinCount },

        ])
    } catch (err) {
        next(err)
    }
}
