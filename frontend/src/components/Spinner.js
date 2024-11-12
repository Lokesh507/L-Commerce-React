import Spinner from "react-bootstrap/Spinner";
function LoadingSpinner() {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        height: "50px",
        width: "50px",
        margin: "auto",
        display: "block",
      }}
    >
      <span className="sr-only ">Loading...</span>
    </Spinner>
  );
}
export default LoadingSpinner;
