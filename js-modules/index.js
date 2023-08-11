


new AirDatepicker("#airdatepicker", {
    inline: true,
    selectedDates: [new Date()],
    isMobile: true,
    autoClose: true,
    timepicker: true,
    buttons: ["today", "clear"],
    keyboardNav: true,
    minDate: new Date(),
    onSelect: onSelectEvent,
  });