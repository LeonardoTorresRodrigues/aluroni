import { Navigate, useParams } from 'react-router-dom';

export default function Admin() {
  const user = useParams();
  if (user.user !== 'leonardo') {
    return <Navigate to="/" />;
  }

  return (
    <h1>Admin</h1>
  );
}