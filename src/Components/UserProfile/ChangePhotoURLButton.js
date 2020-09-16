import React, {useContext} from 'react'

import IconButton from '@material-ui/core/IconButton';
import CameraAltIcon from '@material-ui/icons/CameraAlt';

import {storage} from '../../firebase';
import {UserDispatchContext} from '../../UserManagementContext';
import {gql, useMutation} from '@apollo/client';

import {updatePhotoURL} from '../../firebase';

const CHANGE_PHOTOURL = gql`
  mutation ChangePhotoURL($userUid:String!, $photoURL:String!){
    updatePhotoURL(userUid:$userUid, photoURL: $photoURL){
   	result
  }
}
`
function ChangePhotoURLButton({userUid}) {

  const userDispatch = useContext(UserDispatchContext);

  const [changePhotoURL, { data }] = useMutation(CHANGE_PHOTOURL);
 
  function handleFiles() {
    const fileList = this.files;
    const image = fileList[0];

    if (image !== null) {

      storage.ref(`images/${image.name}`).put(image).then(function (snapshot) {
        console.log('Upload a file');

        storage.ref((`images/${image.name}`)).getDownloadURL()
          .then(function (url) {
            // 현재 세션 업데이트
            userDispatch({type:'changePhotoURL', payload:url})
            // 유저 정보 업데이트
            updatePhotoURL(url)
            // 데이터베이스 업데이트
            changePhotoURL({ variables:
              { userUid,
                photoURL: url} });

          }).catch(function (error) {
            // Handle any errors
          });
      })
    }

  }

  function buildFileSelector() {
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.addEventListener("change", handleFiles, false);

    return fileSelector;
  }

  const fileSelector = buildFileSelector();

  function handleClick(event) {
    event.preventDefault();
    const file = fileSelector.click();
  }

  return (
    <IconButton onClick={handleClick} aria-label="file">
      <CameraAltIcon />
    </IconButton>
  )
}

export default ChangePhotoURLButton
