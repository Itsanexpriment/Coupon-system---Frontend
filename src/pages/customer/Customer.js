import useAuthenticate from '../../hooks/useAuthenticate'

const Customer = () => {
  useAuthenticate();

  return (
    <h1>Customer page</h1>
  );
}

export default Customer;