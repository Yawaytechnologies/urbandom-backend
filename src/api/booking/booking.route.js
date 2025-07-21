import { createBookingController, getBookingByIdController, getBookingsByUserController, updateBookingStatusController, deleteBookingController } from "./booking.controller.js";
import express from "express";

const router = express.Router();


router.post("/", createBookingController);
router.get("/user/:userId", getBookingsByUserController);
router.get("/:bookingId", getBookingByIdController);
router.put("/:bookingId/status", updateBookingStatusController);
router.delete("/:bookingId", deleteBookingController);

export default router;
