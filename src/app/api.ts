const ip_dev = process.env.NEXT_PUBLIC_backend_server_ip;
const ip_prod = process.env.backend_server_ip;
const port_dev = process.env.NEXT_PUBLIC_backend_server_port;
const port_prod = process.env.backend_server_port;

const origin = `http://${ip_dev || ip_prod}:${port_dev || port_prod}`;
export default {
  signup: origin + "/users/signup",
  signin: origin + "/users/signin",
  forgot: origin + "/users/forgot",
  profile: origin + "/users/profile",
  auth: origin + "/users/auth",
  myItem: origin + "/items/myItem",
  market: origin + "/items/market",
  hidden: origin + "/items/hidden",
  posting: origin + "/items/posting",
  safePosting: origin + "/items/safePosting",
  instock: origin + "/items/instock",
  wish: origin + "/items/wish",
  exchange: origin + "/items/exchange",
  wishExchange: origin + "/items/wishExchange",
  waitMatch: origin + "/items/waitMatch",
  match: origin + "/items/match",
  address: origin + "/addresses/address",
  itemAddress: origin + "/addresses/itemAddress",
  matchedAddress: origin + "/addresses/matchedAddress",
};
