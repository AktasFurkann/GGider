import { Text } from '@chakra-ui/react';
import React from 'react'
import { UseAuth } from '../../contexts/authContext'
function Profile() {
    const {user} = UseAuth();

    return (
    <div>
      <Text fontSize="2xl">Profil Ekranı</Text>
      <br></br>
      <code>
        {JSON.stringify(user)}
      </code>
    </div>
  )
}

export default Profile