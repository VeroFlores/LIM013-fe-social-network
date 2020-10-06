import { currentUserAsync } from '../firebase/auth-controller.js';


import { getUser, createPost } from '../firebase/firestore-controller.js';

export const dataProfile = () => {
  currentUserAsync().then((actualUser) => {
    localStorage.setItem('userId', actualUser.uid);
    const getLocalUser = localStorage.getItem('userId');
    console.log(getLocalUser);
    getUser(getLocalUser).then((docUser) => {
      localStorage.setItem('aboutMe', docUser.data().aboutMe);
      localStorage.setItem('location', docUser.data().location);
    });
    localStorage.setItem('name', actualUser.displayName);
    const userProfilePhoto = actualUser.photoURL || './img/profile-ico.png';
    localStorage.setItem('userphoto', userProfilePhoto);
  })
    .catch(() => {
      console.log('error de data profile');
    });

// eslint-disable-next-line import/no-cycle
import { uploadImgPosting } from '../firebase/storage.js';

import { getUser, createPost } from '../firebase/firestore-controller.js';

export const dataProfile = () => {
  const actualUser = currentUser();
  localStorage.setItem('userId', actualUser.uid);
  const getLocalUser=localStorage.getItem('userId');
  console.log(getLocalUser);
  getUser(getLocalUser).then((docUser) => {
    localStorage.setItem('aboutMe', docUser.data().aboutMe);
    localStorage.setItem('location', docUser.data().location);
  });
  localStorage.setItem('name', actualUser.displayName);
  const userProfilePhoto = actualUser.photoURL || 'imagenes/man.png';
  localStorage.setItem('userphoto', userProfilePhoto);

};

export const makingPost = (file, userId, userName, userPhoto) => {
  const newPost = document.querySelector('#status_input').value;
  const status = document.querySelector('.privacy').value;
  const date = new Date().toLocaleString();

  let imPost = '';
  if (file) {
    imPost = localStorage.getItem('image');
    uploadImgPosting(file, userId);
  }

  createPost(userId, userName, newPost, imPost, date, status, userPhoto)
    .then(() => {
      document.querySelector('#status_input').value = '';
    });
};
