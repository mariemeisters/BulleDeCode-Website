interface ErrorProps {
  error: Error;
}

export default function ErrorAlert({ error }: ErrorProps) {
  return (
    <span
      style={{
        margin: "10px 0 10px 0",
        backgroundColor: "pink",
        color: "white",
        padding: "15px",
        borderRadius: "5px"
      }}
    >
      {error.message}
    </span>
  );
}
