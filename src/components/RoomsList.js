import React from "react";
import Room from "./Room";
export default function RoomsList({ rooms }) {
  if (rooms.length === 0) {
    return (
      <div className="empty-search">None of the rooms matched the filters.</div>
    );
  }

  return (
    <section className="room-list">
      <div className="roomslist-center">
        {rooms.map((item, index) => {
          return <Room key={index} room={item} />;
        })}
      </div>
    </section>
  );
}
