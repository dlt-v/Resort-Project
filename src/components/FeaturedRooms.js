import React, { Component } from 'react';
import  { RoomContext } from '../context';
export default class FeaturedRooms extends Component {
  static contextType = RoomContext;
  render() {
    const { featuredRooms: rooms} = this.context;
    console.log(rooms);
    //2:06:15
    return (
      <div>
      </div>
    )
  }
}