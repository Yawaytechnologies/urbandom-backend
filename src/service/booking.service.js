import Booking from "../data/models/booking.model.js";
import User from "../data/models/user.model.js";
import Property from "../data/models/property.model.js";

export const createBooking = async (userId, propertyId) => {
  const property = await Property.findById(propertyId);
  if (!property) {
    throw new Error("Property not found");
  }
    const booking = new Booking({
    user: userId,
    property: propertyId,
    bookingDate: new Date(),
  });
    return await booking.save();
}

export const getBookingsByUser = async (userId) => {
    return await Booking.find({ user: userId })
    .populate('user', 'username email phone') // Populate user details
    .populate({
        path: 'property',
        populate: {
            path: 'owner',
            select: 'username email phone' // Populate owner details
        }
    });
}

export const getBookingById = async (bookingId) => {
    return await Booking.findById(bookingId)
    .populate('user', 'username email phone') // Populate user details
    .populate({
        path: 'property',
        populate: {
            path: 'Owner',
            select: 'username email phone' // Populate owner details
        }
    });
}

export const updateBookingStatus = async (bookingId, status) => {
  const validStatuses = ['pending', 'confirmed', 'cancelled'];
  if (!validStatuses.includes(status)) {
    throw new Error("Invalid booking status");
  }
  
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    throw new Error("Booking not found");
  }
  
  booking.status = status;
  return await booking.save();
}

export const deleteBooking = async (bookingId) => {
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    throw new Error("Booking not found");
  }
    return await Booking.deleteOne({ _id: bookingId });
}



