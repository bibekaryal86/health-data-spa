import { Fragment, useCallback, useContext, useEffect, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { LocalStorage } from '../../common'
import { MSG_KEY_SESSION_INVALID } from '../../constants'
import { AuthContext } from '../context/AuthContext'
import { DefaultUserDetails } from '../types/login.data.types'

interface LogoutProps {
  userLogout: () => void
}

const SessionTimeout = (props: LogoutProps) => {
  // log out when inactive
  const { userLogout } = props
  // redirect to home page when log out
  const navigate = useNavigate()
  // also update context when log out
  const authContext = useContext(AuthContext)

  const events = useMemo(() => ['keypress', 'mousemove', 'click'], [])
  const warningInactiveInterval = useRef(0)
  const startTimerInterval = useRef(0)

  const navigateToHome = useCallback(
    (msg: string) => {
      console.log(msg)
      clearInterval(warningInactiveInterval.current)
      clearTimeout(startTimerInterval.current)
      userLogout()
      authContext.login({
        isLoggedIn: false,
        token: '',
        userDetails: DefaultUserDetails,
      })

      navigate('/', {
        replace: true,
        state: { message: MSG_KEY_SESSION_INVALID },
      })
    },
    [authContext, navigate, userLogout],
  )

  const warningInactive = useCallback(() => {
    clearTimeout(startTimerInterval.current)
    warningInactiveInterval.current = window.setInterval(() => {
      const tokenExpiration = LocalStorage.getItem('tokenExpiration') as number
      const tokenExpDate = tokenExpiration ? new Date(tokenExpiration) : new Date()
      const currentDateTime = new Date()

      if (tokenExpiration && tokenExpDate <= currentDateTime) {
        console.log('INSIDE', tokenExpDate, tokenExpiration, tokenExpDate <= currentDateTime, currentDateTime)
        navigateToHome('Token Expired, Redirecting to Home')
      }
    }, 1000)
  }, [navigateToHome])

  // start inactive check
  const timeChecker = useCallback(() => {
    startTimerInterval.current = window.setTimeout(() => {
      warningInactive()
    }, 60000)
  }, [warningInactive])

  // reset interval timer
  const resetTimer = useCallback(() => {
    clearTimeout(startTimerInterval.current)
    clearInterval(warningInactiveInterval.current)

    const isAuthenticated = LocalStorage.getItem('tokenExpiration') as number
    const isForceCheckout = LocalStorage.getItem('forceLogout') as boolean

    if (isForceCheckout && isAuthenticated) {
      navigateToHome('Token Invalid Redirecting to Home')
    } else if (isAuthenticated) {
      LocalStorage.setItem('tokenExpiration', new Date().setMinutes(new Date().getMinutes() + 15))
    } else {
      clearInterval(warningInactiveInterval.current)
    }

    timeChecker()
  }, [navigateToHome, timeChecker])

  useEffect(() => {
    events.forEach((event) => {
      window.addEventListener(event, resetTimer)
    })

    timeChecker()

    return () => {
      clearTimeout(startTimerInterval.current)
      resetTimer()
    }
  }, [resetTimer, events, timeChecker])

  // change fragment to modal and handleClose func to close
  return <Fragment />
}

export default SessionTimeout
