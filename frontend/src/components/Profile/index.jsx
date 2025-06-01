import React from 'react';
import { useAuthProfile } from '../../hooks/reactQuery/useAuthApi';

const Profile = () => {
  const { data, isLoading, isError, isFetching, error } = useAuthProfile();

  console.log('isLoading', isLoading);
  console.log('isfetching', isFetching);
  console.log('data', data);
  console.log('iserror', isError);
  console.log('error', error);
  return <div>Profile</div>;
};

export default Profile;
