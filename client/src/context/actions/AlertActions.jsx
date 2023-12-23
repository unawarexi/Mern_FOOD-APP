export const AlertSuccess = (message) => {
  return {
    type: "SET_SUCCESS",
    alert: { type: "success", message: message },
  };
};
export const AlertWarning = (message) => {
  return {
    type: "SET_WARNING",
    alert: { type: "warning", message: message },
  };
};
export const AlertDanger = (message) => {
  return {
    type: "SET_DANGER",
    alert: { type: "danger", message: message },
  };
};

export const AlertInfo = (message) => {
  return {
    type: "SET_INFO",
    alert: { type: "info", message: message },
  };
};

export const AlertNull = (message) => {
  return {
    type: "SET_ALERT_NULL",
    alert: null,
  };
};
