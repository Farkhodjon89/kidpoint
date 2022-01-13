import { v4 as uuidV4 } from "uuid";
import jwt from "jsonwebtoken";
import withSession from '../../../utils/session'
import client from "../../../apollo/apollo-client";
import { OTP_AUTH } from "../../../mutations/auth";
import { CUSTOMER } from "../../../queries/customer";

export default withSession(async (req, res) => {
  const { phone, otp } = req.body;
  

  try {
    const otpResult = await client.query({
      query: OTP_AUTH,
      fetchPolicy: "no-cache",
      variables: {
        mutationId: uuidV4(),
        phone,
        otp
      }
    });

    const { authToken, refreshToken } = otpResult.data.login;
    const decoded = jwt.decode(authToken);

    const userResult = await client.query({
      query: CUSTOMER,
      fetchPolicy: "no-cache",
      variables: {
        customerId: parseInt(decoded.data.user.id)
      }
    });

    const userData = {
      user: userResult.data.customer,
      isLoggedIn: true,
    };

    req.session.set("user", { ...userData, refreshToken, authToken, });

    await req.session.save();

    delete userData.user.id
    res.json({ status: true, userData });
  } catch (error) {
    console.log("L41 error.graphQLErrors:", error.graphQLErrors);
    console.log("L42 error.networkError:", error.networkError);
    console.log("L43 error.extraInfo:", error.extraInfo);
    console.log("L44 error.message:", error.message);

    const translatedErrorMessages = {
      "GraphQL error: invalid otp": "Неверный код"
    };

    res.json({
      status: false,
      message: translatedErrorMessages[error.message] || error.message
    });
  }
})
