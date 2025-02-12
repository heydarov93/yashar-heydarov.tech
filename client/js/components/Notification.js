class Notification {
  popUpEl;
  popUpContentEl;
  underLineEl;
  messageEl;
  message; // message to display
  type; // type can be 'success' or 'error'
  isDisplayed; // true if pop up on the screen, otherwise false
  timeOut;

  constructor() {
    // Popup is not displayed initially
    this.isDisplayed = false;

    // Create notification wrapper with appropriate styles and classes
    this.popUpEl = document.createElement('div');
    this.popUpEl.style.display = 'none';
    this.popUpEl.classList.add('pop-up');

    // Create notification content wrapper with appropriate styles and classes
    this.popUpContentEl = document.createElement('div');
    this.popUpContentEl.classList.add('pop-up-content');

    // Create underline element and add appropriate styles based on the type of notification
    // and it will be animated
    this.underLineEl = document.createElement('div');
    this.underLineEl.classList.add('underline');

    // Create message element and add appropriate text and classes
    // based on the type of notification
    this.messageEl = document.createElement('p');
    this.messageEl.classList.add('message');

    // Append elements to the DOM
    document.body.appendChild(this.popUpEl);
    this.popUpEl.appendChild(this.popUpContentEl);
    this.popUpContentEl.appendChild(this.messageEl);
    this.popUpContentEl.appendChild(this.underLineEl);
  }

  // Show notification message
  show(message, type) {
    // first hide existed popup
    this.hide();

    // insert text message and give type of the message
    this.messageEl.textContent = message;
    this.popUpEl.classList.add(type);
    this.popUpEl.style.display = 'block';
    this.isDisplayed = true;

    // hide popup after a couple of seconds
    this.timeOut = setTimeout(() => {
      this.popUpEl.style.display = 'none';
      this.isDisplayed = false;
    }, 3000);
  }

  // Hide notification message
  hide() {
    // first clear, because time out is async
    // but we need immediately to hide it, without waiting
    clearTimeout(this.timeOut);
    this.popUpEl.style.display = 'none';
    this.isDisplayed = false;
  }
}

export default Notification;
