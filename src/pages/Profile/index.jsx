import Paper from '@mui/material/Paper';

import { useSelector } from 'react-redux';
import { userData } from '../../redux/slices/auth';

export const Profile = () => {
  const user = useSelector(userData);

  return (
    <Paper style={{ padding: 30 }}>
      <div>Имя: {user?.fullName}</div>
      <div>E-mail {user?.email}</div>
    </Paper>
  );
};
