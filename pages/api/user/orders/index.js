import withSession from '../../../../utils/session'
import client from "../../../../apollo/apollo-client";
import { formatOrder } from "../../../../utils";
import { CUSTOMER_ORDERS } from "../../../../queries/customer";
import { checkSession } from "../../../../utils/checkSession";

export default withSession(async (req, res) => {
  const userData = await checkSession(req.session.get("user"), req);
  const { first } = req.body;

  if (!userData.isLoggedIn) {
    res.json({ status: false });

    return;
  }

  const response = await client.query({
    query: CUSTOMER_ORDERS,
    fetchPolicy: "no-cache",
    context: {
      customerToken: userData.authToken,
    },
    variables: {
      customerId: userData.user.databaseId
    }
  });

  let orders = response.data.orders.nodes.map(formatOrder);

  if (first) {
    orders = orders.slice(0, first);
  }

  res.json({
    status: true,
    orders
  });
})
