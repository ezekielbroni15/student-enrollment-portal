const MESSAGE_BY_TYPE = {
  loading: "Loading student roster...",
  error: "Something went wrong while loading the roster. Showing starter students instead.",
};

const StatusMessage = ({ type }) => {
  return (
    <p className={`status-message status-${type}`}>
      {MESSAGE_BY_TYPE[type] || "Status unavailable."}
    </p>
  );
};

export default StatusMessage;
