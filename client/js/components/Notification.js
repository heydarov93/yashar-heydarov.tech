class Notification {
  // type can be 'success' or 'error'
  constructor(message, type) {
    this.message = message;
    this.type = type;

    // Create notification wrapper with appropriate styles and classes
    const popUpEl = document.createElement('div');
    popUpEl.classList.add('pop-up');
    popUpEl.classList.add(type);

    const popUpContentEl = document.createElement('div');
    popUpContentEl.classList.add('pop-up-content');

    // Create underline element and add appropriate styles based on the type of notification
    // and it will be animated
    const underLineEl = document.createElement('div');
    underLineEl.classList.add('underline');

    // Create message element and add appropriate text and classes
    // based on the type of notification
    const messageEl = document.createElement('p');
    messageEl.classList.add('message');
    messageEl.textContent = message;

    // Append elements to the DOM
    document.body.appendChild(popUpEl);
    popUpEl.appendChild(popUpContentEl);
    popUpContentEl.appendChild(messageEl);
    popUpContentEl.appendChild(underLineEl);
  }
}

export default Notification;
