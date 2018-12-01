var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),
  $newRoom: $('#rooms #roomName'),

  initialize: function () {
    RoomsView.$newRoom.on('submit', RoomsView.newRoom);
    RoomsView.$select.on('change', RoomsView.handleChange);
    RoomsView.$button.on('click', RoomsView.handleClick);
  },

  render: function () {

    RoomsView.$select.html('');
    Rooms
      .items()
      .each(RoomsView.renderRoom);
    RoomsView.$select.val(Rooms.selected);
  },

  renderRoom: function (roomname) {
    var $option = $('<option>').val(roomname).text(roomname);
    RoomsView.$select.append($option);
  },

  handleChange: function (event) {
    Rooms.selected = RoomsView.$select.val();
    MessagesView.render();
  },

  newRoom: function (event) {
    event.preventDefault();
    Rooms.add(RoomsView.$newRoom.find('#message').val(), () => {
      RoomsView.render();
      MessagesView.render();
    });
    RoomsView.$newRoom[0].reset();
  },

  handleClick: function (event) {
    var roomname = prompt('Enter room name');
    if (roomname) {
      Rooms.add(roomname, () => {
        RoomsView.render();
        MessagesView.render();
      });
    }
  }

};
