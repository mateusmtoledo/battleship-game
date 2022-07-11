const events = {};

function subscribe(eventName, f) {
  if (!events[eventName]) events[eventName] = [];
  events[eventName].push(f);
}

function publish(eventName, data) {
  if (events[eventName]) {
    events[eventName].forEach((f) => {
      f(data);
    });
  }
}

function unsubscribe(eventName, f) {
  if (events[eventName].includes(f)) events[eventName].splice(events[eventName].indexOf(f));
}

export default { subscribe, publish, unsubscribe };
