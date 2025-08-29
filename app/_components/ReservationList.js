"use client";
import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteBooking } from "../_lib/actions";

function ReservationList({ bookings }) {
  // The useOptimistic state can be destructured into 2 variables. Same like useState, the first one is for storing the state and the second one is a function for dispatch / trigger the optimistic operation
  // In this optimistic hook it takes 2 arguments:
  // 1) It takes the intiial state which is bookings in this case
  // 2) It takes a state update function which will determine the next optimistic state, it has 2 arguments: the first one is current state and some new information that are needed to execute the async operations
  // After that, we return the new state which this case by filtering the current bookings. If in the middle of the operation it returns error, it will rollback to the previous state
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId);
    await deleteBooking(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          onDelete={handleDelete}
          booking={booking}
          key={booking.id}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
