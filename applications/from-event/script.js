import { fromEvent } from 'rxjs';

const button = document.getElementById('create-notification');
const notificationMessages = document.getElementById('notification-messages');

const createNotificationElement = (msg) => {
  const element = document.createElement('article');
  element.innerText = `Something happened: ${msg}`;
  return element;
};

const addMessageToDOM = (msg) => {
  const notification = createNotificationElement(msg);
  notificationMessages.appendChild(notification);
};

/**
 * Your mission:
 *
 * - Use `fromEvent` to create an observable that streams click events.
 * - Subscribe to that observable.
 * - Use `addMessageToDOM` to add a useless message to the DOM whenever the
 *   stream emits a value.
 */

let index = 0;
fromEvent(button, 'click').subscribe((event) =>
  addMessageToDOM(`event ${index++}`),
);
