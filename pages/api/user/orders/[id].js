import withSession from '../../../../utils/session'
import client from "../../../../apollo/apollo-client";
import { formatOrder } from "../../../../utils";
import { CUSTOMER_ORDER } from "../../../../queries/customer";
import { checkSession } from "../../../../utils/checkSession";

export default withSession(async (req, res) => {
  const userData = await checkSession(req.session.get("user"), req);
  const { orderId } = req.body;

  if (!userData.isLoggedIn) {
    res.json({ status: false });

    return;
  }

  const response = await client.query({
    query: CUSTOMER_ORDER,
    fetchPolicy: "no-cache",
    variables: {
      orderId
    }
  });

  res.json({
    status: true,
    order: formatOrder(response.data.order)
  });
})
