import { v4 as uuidV4 } from "uuid";

import withSession from '../../../utils/session'
import client from "../../../apollo/apollo-client";
import { CUSTOMER } from "../../../queries/customer";
import { UPDATE_CUSTOMER } from "../../../mutations/customer";
import { checkSession } from "../../../utils/checkSession";

export default withSession(async (req, res) => {
  let userData = await checkSession(req.session.get("user"), req);

  if (userData == null || !userData.isLoggedIn) {
    return res.json({ isLoggedIn: false })
  }

  const { firstName, lastName, phone, email, country, city, address } = req.body;

  try {
    const _userResult = await client.query({
      query: UPDATE_CUSTOMER,
      fetchPolicy: "no-cache",
      context: {
        customerToken: userData.authToken,
      },
      variables: {
        mutationId: uuidV4(),
        id: userData.user.id,
        firstName,
        lastName,
        phone,
        email,
        city,
        address,
      }
    });

    const newUserData = {
      ...userData,
      isLoggedIn: true,
      user: _userResult.data.updateCustomer.customer
    };

    req.session.set('user', newUserData);
    await req.session.save()

    delete newUserData.user.id
    delete newUserData.refreshToken
    delete newUserData.authToken

    return res.json(newUserData);
  } catch (e) {
    console.log('l53', e)
    return res.json({});
  }

})
