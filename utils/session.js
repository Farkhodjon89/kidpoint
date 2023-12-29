import {withIronSession} from 'next-iron-session'

// add cookies to requests
export default function withSession(handler) {
  return withIronSession(handler, {
    password: 'k2g37eqwhh01qn2r5fsh0l5trgqfafqo',
    cookieName: 'auth-cookie',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  })
}
