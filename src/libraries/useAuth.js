import { useEffect } from "react";
import { getProfile } from "./spotify";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { login, storeUser } from "../redux/store/auth";

export const useAuth =  () => {
  const { isAuthenticated, accessToken, user } = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const history = useHistory();
  
    useEffect(() => {
      if (!isAuthenticated && window.location.hash) {
        const paramsInUrl = window.location.hash.substr(1).split('&')
        paramsInUrl.forEach(paramsSplitUp => {
          const [key, value] = paramsSplitUp.split('=')
          if (key === 'access_token') dispatch(login(value))
        })
      }
      
      if (isAuthenticated && Object.keys(user).length === 0) {
        getProfile(accessToken).then(user => {
          dispatch(storeUser(user))
          history.push('/home')
        })
      }
    }, [isAuthenticated, accessToken, user, history, dispatch])
  
    return useSelector(state => state.auth)
}
