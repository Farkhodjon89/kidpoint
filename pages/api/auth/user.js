import withSession from '../../../utils/session'
import { checkSession } from '../../../utils/checkSession'

export default withSession(async (req, res) => {
  const user = await checkSession(req.session.get('user'), req)

  if (user.isLoggedIn) {
    delete user.authToken
    delete user.refreshToken
    delete user.user.id
    res.json({
      isLoggedIn: true,
      ...user
    })
  } else {
    res.json({
      isLoggedIn: false
    })
  }
})
