import React, {useState, useContext, useEffect} from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';


import { UserContext } from '../../UserManagementContext';

import styled from 'styled-components';
import ModalFactory from '../ModalFactory';
import ChangeUsernameButton from './ChangeUsernameButton';
import ChangeUsernameContent from './ChangeUsernameContent';
import ChangePhotoURLButton from './ChangePhotoURLButton';


const Container = styled.div`
  display: grid;
  grid-template-rows: repeat(1fr, auto);
  gap: 1rem;
  place-items: center;
`

const UserName = styled.div`
  font-size: 1rem;
  cursor: pointer;
`

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));


function UserProfileContent({ dispatch }) {

  const [profile, setUserProfile] = useState({})
  const currentUser = useContext(UserContext)

  useEffect(() => {
    setUserProfile(currentUser);
  }, [currentUser])

  const classes = useStyles();

  const buttonProps = {
    id: "change-username",
    label: profile.displayName,
    size: "large",
    variant: "outlined"
  }

  return (
    <Container>
      <div>
        <Badge
          overlap="circle"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          badgeContent={<ChangePhotoURLButton userUid={profile.uid}/>}
        >
          <Avatar alt={profile.displayName} src={profile.photoURL} className={classes.large} />
        </Badge>
      </div>
      <ModalFactory 
        button={ChangeUsernameButton} 
        buttonProps={ {displayName: profile.displayName} }
        content={ChangeUsernameContent}
        contentProps={  {userUid: profile.uid} }
      />
    </Container>
  )
}

export default UserProfileContent
