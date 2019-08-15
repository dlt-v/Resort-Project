import React, { Component } from "react";
import items from "./data";

const RoomContext = React.createContext();

class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: "all",

    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false
  };
  //getData
  componentDidMount() {
    let rooms = this.formatData(items);
    let featuredRooms = rooms.filter(room => room.featured === true);
    let maxPrice = Math.max(...rooms.map(item => item.price));
    let maxSize = Math.max(...rooms.map(item => item.size));
    console.log(rooms);

    this.setState({
      rooms,
      featuredRooms,
      sortedRooms: rooms,
      loading: false,
      price: maxPrice,
      maxPrice,
      maxSize
    });
  }
  formatData(items) {
    let tempItems = items.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(image => image.fields.file.url);
      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  }
  getRoom = slug => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find(room => room.slug === slug);
    return room;
  };
  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = event.target.name;
    this.setState(
      {
        [name]: value
      },
      this.filterRooms
    );
  };
  filterRooms = () => {
    //Get values from state
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets
    } = this.state;
    //Get all the rooms to tempRooms
    let tempRooms = [...rooms];
    //Parse string from inputs to integer
    capacity = parseInt(capacity);
    price = parseInt(price);
    //Filter the rooms and replace tempRooms with the result
    //By type of room
    if (type !== "all") {
      tempRooms = tempRooms.filter(room => room.type === type);
    }
    //By capacity
    if(capacity !== 1){
      tempRooms = tempRooms.filter(room => room.capacity >= capacity)
    }
    //By price
    tempRooms = tempRooms.filter(room => room.price <= price);
    //By size
    tempRooms = tempRooms.filter(room => room.size > minSize && room.size < maxSize);
    //By breakfast
    if(breakfast) {
      tempRooms =  tempRooms.filter(room => room.breakfast);
    }
    //By pets
    if(pets) {
      tempRooms = tempRooms.filter(room => room.pets);
    }

    //Put tempRooms in sortedRooms in State
    this.setState({
      sortedRooms: tempRooms
    });
  };
  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}
const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {value => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}

export { RoomContext, RoomProvider, RoomConsumer };
