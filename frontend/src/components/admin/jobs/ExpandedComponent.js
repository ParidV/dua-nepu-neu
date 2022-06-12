const ExpandedComponent = ({ data }) => (
  <pre>
    Të dhënat e kompanisë:
    <br />
    {JSON.stringify(data.User, null, 2)}
  </pre>
);

export default ExpandedComponent;