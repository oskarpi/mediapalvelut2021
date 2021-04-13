/* eslint-disable max-len */
import {useEffect, useState} from 'react';
import {appIndentifier, baseUrl} from '../utils/variables';
import {useContext} from 'react';
import {MediaContext} from '../contexts/MediaContext';

// general function for fetching (options default value is empty object)
const doFetch = async (url, options = {}) => {
  const response = await fetch(url, options);
  const json = await response.json();
  if (json.error) {
    // if API response contains error message (use Postman to get further details)
    throw new Error(json.message + ': ' + json.error);
  } else if (!response.ok) {
    // if API response does not contain error message, but there is some other error
    throw new Error('doFetch failed');
  } else {
    // if all goes well
    return json;
  }
};


const useAllMedia = (ownFiles) => {
  const [user] = useContext(MediaContext);
  const [picArray, setPicArray] = useState([]);

  useEffect(() => {
    const loadMedia = async () => {
      const response = await fetch(baseUrl + 'tags/' + appIndentifier);
      const files = await response.json();
      // console.log(files);

      let allFiles = await Promise.all(files.map(async (item) => {
        const resp = await fetch(baseUrl + 'media/' + item.file_id);
        return resp.json();
      }));

      if (ownFiles) {
        allFiles = allFiles.filter((item) =>{
          return item.user_id === user.user_id;
        });
      };

      setPicArray(allFiles);
    };
    loadMedia();
  }, []);

  return picArray;
};


const useUsers = () => {
  const postRegister = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    try {
      const response = await doFetch(baseUrl + 'users', fetchOptions);
      return response;
    } catch (e) {
      alert(e.message);
    }
  };

  const getUserAvailable = async (username) => {
    try {
      const response = await doFetch(baseUrl + 'users/username/' + username );
      return response.available;
    } catch (e) {
      console.error(e.message);
    }
  };

  const getUser = async (token) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      const response = await doFetch(baseUrl + 'users/user', fetchOptions);
      return response;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const getUserById = async (token, id) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      const response = await doFetch(baseUrl + 'users/' + id, fetchOptions);
      return response;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return {postRegister, getUserAvailable, getUser, getUserById};
};

const useLogin = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    try {
      const response = await doFetch(baseUrl + 'login', fetchOptions);
      return response;
    } catch (e) {
      console.error(e.message);
    }
  };
  return {postLogin};
};

const useMedia = () => {
  const [loading, setLoading] = useState(false);
  const postMedia = async (fd, token) =>{
    setLoading(true);
    const fetchOptions = {
      method: 'POST',
      headers: {
        'x-access-token': token,
      },
      body: fd,
    };
    try {
      const response = await doFetch(baseUrl + 'media', fetchOptions);
      return response;
    } catch (e) {
      throw new Error('upload failed');
    } finally {
      setLoading(false);
    }
  };
  const putMedia = async (data, id, token) =>{
    setLoading(true);
    const fetchOptions = {
      method: 'PUT',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    try {
      const response = await doFetch(baseUrl + 'media/' +id, fetchOptions);
      return response;
    } catch (e) {
      throw new Error('modify failed');
    } finally {
      setLoading(false);
    }
  };

  const deleteMedia = async (id, token) =>{
    setLoading(true);
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      const response = await doFetch(baseUrl + 'media/' +id, fetchOptions);
      return response;
    } catch (e) {
      throw new Error('delete failed');
    } finally {
      setLoading(false);
    }
  };
  return {postMedia, loading, putMedia, deleteMedia};
};

const useTag = () => {
  const postTag = async (token, id, tag = appIndentifier) =>{
    const data = {
      file_id: id,
      tag,
    };
    const fetchOptions = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    try {
      const response = await doFetch(baseUrl + 'tags', fetchOptions);
      return response;
    } catch (e) {
      throw new Error('tagging failed');
    }
  };
  return {postTag};
};


export {useAllMedia, useUsers, useLogin, useMedia, useTag};

