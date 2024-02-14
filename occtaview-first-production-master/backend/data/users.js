import bcrypt from "bcryptjs";
const users = [
  {
    sponser: null,
    userStatus: "pending",
    username: "Super Admin",
    email: "octtaview@gmail.com",
    address: "octtaview-cyber",
    packageAmount: 10000,
    password: bcrypt.hashSync("Bvssm@4321", 10),
    isSuperAdmin: true,
    transactionPassword: bcrypt.hashSync("123456", 10),
    previousPackage: "Bronza",
    addFundStatus: "",
    phone: 9852416378,
    ownSponserId: "OCV461054",
  },
];
export default users;
