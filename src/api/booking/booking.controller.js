import { createBooking, getBookingById, getBookingsByUser, updateBookingStatus,deleteBooking, } from "../../service/booking.service.js";

export const createBookingController = async (req, res) => {
  try {
    const { property, user } = req.body;

    const booking = await createBooking(user, property);

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating booking",
      error: error.message,
    });
  }
};

export const getBookingsByUserController = async (req, res) => {
    try {
        const { userId } = req.params;
        const bookings = await getBookingsByUser(userId);
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching bookings", error: error.message });
    }
}

export const getBookingByIdController = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const booking = await getBookingById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: "Error fetching booking", error: error.message });
    }
}

export const updateBookingStatusController = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const { status } = req.body;
        const updatedBooking = await updateBookingStatus(bookingId, status);
        res.status(200).json({ message: "Booking status updated successfully", updatedBooking });
    } catch (error) {
        res.status(500).json({ message: "Error updating booking status", error: error.message });
    }
}

export const deleteBookingController = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const deletedBooking = await deleteBooking(bookingId);
        res.status(200).json({ message: "Booking deleted successfully", deletedBooking });
    } catch (error) {
        res.status(500).json({ message: "Error deleting booking", error: error.message });
    }
}

