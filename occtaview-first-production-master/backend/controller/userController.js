import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../middleware/errorHandler.js";
import upload from "../config/multiFileUpload.js";
import Package from "../models/packageModel.js";
import sendMail from "../config/mailer.js";

// user login

export const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(401, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong credentials"));
    }
    const token = jwt.sign({ userId: validUser._id }, "Shyam", {
      expiresIn: "1d",
    });
    //const {password:hashedPassword,...rest}=validUser._doc
    res.cookie("access_token", token, { httpOnly: true }).status(200).json({
      id: validUser._id,
      firstName: validUser.username,
      status: validUser.userStatus,
      email: validUser.email,
      token_type: "Bearer",
      access_token: token,
      sts: "01",
      msg: "Login Success",
    });

    // res.status(200).json(
    // });
  } catch (error) {
    next(error);
  }
};

//find user package with capital amount

export const findPackage = (depositAmount) => {
  if (depositAmount >= 50 && depositAmount <= 999) {
    return "Bronza";
  } else if (depositAmount >= 1000 && depositAmount <= 4999) {
    return "Silver";
  } else if (depositAmount >= 5000 && depositAmount <= 14999) {
    return "Gold";
  } else if (depositAmount >= 15000 && depositAmount <= 29999) {
    return "Diamond";
  } else if (depositAmount >= 30000) {
    return "Platinum";
  } else {
    return "Unknown";
  }
};

//generate sponser random code

export const generateRandomString = () => {
  const baseString = "OCV";
  const randomDigits = Math.floor(Math.random() * 999999);
  return baseString + randomDigits.toString();
};

//generate referal income for all

export const generateReferalIncome = async (
  userId,
  id,
  capitalAmount,
  transactionCode
) => {
  try {
    const referalIncome = capitalAmount * 0.05;
    const sponserData = await User.findById(id);
    const userData = await User.findById(userId);
    if (sponserData) {
      const totalRaferal = sponserData.referalIncome + referalIncome;
      sponserData.referalIncome = totalRaferal;
      sponserData.walletAmount = sponserData.walletAmount + referalIncome;
      sponserData.referalHistory.push({
        reportName: "DirectIncome",
        userID: userData.ownSponserId,
        name: userData.username,
        amountCredited: referalIncome,
        transactionCode: transactionCode,
        status: "Approved",
      });
      const updatedSponser = await sponserData.save();
      if (updatedSponser) {
        return totalRaferal;
      }
    } else {
      next(errorHandler("Sponser not found"));
    }
  } catch (error) {
    next(error);
  }
};

export const viewAddFundPending = async (req, res, next) => {
  const userId = req.user._id;
  const userData = await User.findById(userId);
  try {
    if (userData) {
      //const userStatus=userData.userStatus;
      if (
        userData.addFundStatus == "pending" ||
        userData.addPackageStatus == "pending"
      ) {
        res.status(200).json({
          userData,
          sts: "01",
          msg: "get Package Fund add pending user Success",
        });
      } else {
        res.status(200).json({
          sts: "01",
          msg: "no pending data",
        });
      }
    } else {
      return next(errorHandler(401, "User Login Failed"));
    }
    if (
      userData.addFundStatus == "pending" ||
      userData.addPackageStatus == "pending"
    ) {
      res.status(200).json({
        userData,
        sts: "01",
        msg: "get Package Fund add pending user Success",
      });
    } else {
      return next(errorHandler(401, "User Login Failed"));
    }
  } catch (error) {
    next(error);
  }
};

//add user by user and admin

export const addUser = async (req, res, next) => {
  try {
    const sponser = req.user._id;
    const userStatus = "pending";

    const sponserData = await User.findById(sponser);
    const sponserName = sponserData.username;
    const ownSponserId = generateRandomString();

    const { username, email, phone, address, transactionPassword, password } =
      req.body;
    // const packageChosen = findPackage(packageAmount);
    // const packageData = await Package.findOne({ name: packageChosen });
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const hashedTxnPassword = bcryptjs.hashSync(transactionPassword, 10);

    const existingUser = await User.findOne({ email });
    const existingUserByPhone = await User.findOne({ phone });

    if (existingUser || existingUserByPhone) {
      return next(errorHandler(401, "User Already Exist"));
    }

    const user = await User.create({
      sponser,
      sponserName,
      username,
      email,
      phone,
      address,
      transactionPassword: hashedTxnPassword,
      password: hashedPassword,
      ownSponserId,
      userStatus,
    });
    if (user) {
      await sendMail(
        user.email,
        // packageChosen,
        // packageAmount,
        user.username,
        user.ownSponserId,
        transactionPassword,
        password
      );

      res.status(200).json({
        _id: user._id,
        sponser: user.sponser,
        sponserName: user.sponserName,
        name: user.username,
        email: user.email,
        phone: user.phone,
        address: user.address,

        ownSponserId: user.ownSponserId,
        earning: user.earning,
        userStatus: user.userStatus,
      });
    } else {
      return next(errorHandler(400, "Registration failed. Please try again!"));
    }
  } catch (error) {
    next(error);
  }
};

// add user by Referal link
export const addReferalUser = async (req, res, next) => {
  try {
    const userStatus = "pending";

    const ownSponserId = generateRandomString();

    const {
      userId,
      username,
      email,
      phone,
      address,
      transactionPassword,
      password,
    } = req.body;

    const sponser = userId;

    const sponserData = await User.findById(sponser);
    const sponserName = sponserData.username;

    // const packageChosen = findPackage(packageAmount);
    // const packageData = await Package.findOne({ name: packageChosen });
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const hashedTxnPassword = bcryptjs.hashSync(transactionPassword, 10);

    const existingUser = await User.findOne({ email });
    const existingUserByPhone = await User.findOne({ phone });

    if (existingUser || existingUserByPhone) {
      return next(errorHandler(401, "User Already Exist"));
    }

    const user = await User.create({
      sponser,
      sponserName,
      username,
      email,
      phone,
      address,
      transactionPassword: hashedTxnPassword,
      // packageAmount,
      // packageChosen: packageData._id,
      password: hashedPassword,
      ownSponserId,
      userStatus,
    });
    if (user) {
      await sendMail(
        user.email,
        user.username,
        user.ownSponserId,
        transactionPassword,
        password
      );

      res.status(200).json({
        _id: user._id,
        sponser: user.sponser,
        sponserName: user.sponserName,
        name: user.username,
        email: user.email,
        phone: user.phone,
        address: user.address,
        // packageAmount: user.packageAmount,
        // packageChosen: user.packageChosen,
        ownSponserId: user.ownSponserId,
        userStatus: user.userStatus,
      });
    } else {
      return next(errorHandler(400, "Registration failed. Please try again!"));
    }
  } catch (error) {
    next(error);
  }
};

// get add user by Referal link
export const getAddReferalUser = async (req, res, next) => {
  try {
    const sponser = req.query.id;

    const sponserData = await User.findOne(sponser);
    const sponserId = sponserData.ownSponserId;

    if (sponserData) {
      return res.status(201).json({
        sponserData,
        sponserId: sponserId,
        sts: "01",
        msg: "User verification in progress!",
      });
    } else {
      return next(errorHandler(401, "Verification failed. Please try again!"));
    }
  } catch (error) {
    next(error);
  }
};

//verify users using Aadhaar card and Pancard

export const verifyUser = async (req, res, next) => {
  try {
    upload(req, res, async function (err) {
      if (err) {
        return next(errorHandler(400, "File upload error"));
      }
      const userId = req.user._id;
      const user = await User.findById(userId);

      if (user) {
        const aadhaarImage = req.files["aadhaar"][0];
        // const pancardImage = req.files["pancard"][0];

        // if (!aadhaarImage || !pancardImage) {
        //   return next(
        //     errorHandler(400, "Both Aadhaar and Pancard images are required")
        //   );
        // }

        user.aadhaar = aadhaarImage.filename;
        // user.pancard = pancardImage.filename;
        user.userStatus = "readyToApprove";

        const updatedUser = await user.save();
        if (updatedUser) {
          return res.status(201).json({
            updatedUser,
            sts: "01",
            msg: "User verification in progress!",
          });
        } else {
          return next(
            errorHandler(401, "Verification failed. Please try again!")
          );
        }
      } else {
        return next(errorHandler(401, "User not found"));
      }
    });
  } catch (error) {
    next(error);
  }
};

//View Profile

export const viewUserProfile = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const userData = await User.findById(userId).populate("packageChosen");
    let packageName;
    const dailyBonus = userData.dailyROI.toFixed(2);
    const directIncome = userData.referalIncome.toFixed(2);
    const packageData = userData.packageChosen;
    const totalIncome = userData.walletAmount.toFixed(2);
    if (packageData) {
      packageName = packageData.name;
    } else {
      packageName = null;
    }

    const countFirstChild = userData.childLevel1.length;
    const countSecondChild = userData.childLevel1.length;
    const countThreeChild = userData.childLevel1.length;
    const totalLevelRoi = (
      userData.level1ROI +
      userData.level2ROI +
      userData.level3ROI
    ).toFixed(2);

    // .select(
    //   "username ownSponserId email phone userStatus packageAmount"
    // );
    if (userData) {
      res.status(200).json({
        id: userData._id,
        userStatus: userData.userStatus,
        ownSponserId: userData.ownSponserId,
        packageName: packageName,
        name: userData.username,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        dailyBonus: dailyBonus,
        levelRoi: totalLevelRoi,
        aadhaar: userData.aadhaar,
        // packageChosen: user.packageChosen,
        capitalAmount: userData.packageAmount,
        myDownline: countFirstChild,
        directIncome: directIncome,
        totalIncome: totalIncome,
        sts: "01",
        msg: "get user profile Success",
      });
    } else {
      next(errorHandler("User not found"));
    }
  } catch (error) {
    next(error);
  }
};

// edit user profile

export const editProfile = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const userData = await User.findById(userId);
    if (userData) {
      const { username, phone, address } = req.body;

      userData.username = username || userData.username;
      userData.address = address || userData.address;
      userData.phone = phone || userData.phone;

      const updatedUser = await userData.save();

      res
        .status(200)
        .json({ updatedUser, sts: "01", msg: "Successfully Updated" });
    } else {
      next(errorHandler("User not found, Please Login first"));
    }
  } catch (error) {
    next(error);
  }
};

//view all transactions

export const viewAllTransactions = async (req, res) => {
  try {
    const userId = req.user._id;
    const { reportName } = req.body;
    const userData = await User.findById(userId).populate([
      "referalHistory",
      "level1ROIHistory",
      "level2ROIHistory",
      "level3ROIHistory",
      "dailyROIHistory",
      "walletWithdrawHistory",
      "capitalWithdrawHistory",
    ]);

    if (userData) {
      const userStatus = userData.userStatus;
      const referalHistory = userData.referalHistory || [];
      const level1ROIHistory = userData.level1ROIHistory || [];
      const level2ROIHistory = userData.level2ROIHistory || [];
      const level3ROIHistory = userData.level3ROIHistory || [];
      const dailyROIHistory = userData.dailyROIHistory || [];
      const walletWithdrawHistory = userData.walletWithdrawHistory || [];
      const capitalWithdrawHistory = userData.capitalWithdrawHistory || [];

      const allTransactions = [
        ...referalHistory,
        ...level1ROIHistory,
        ...level2ROIHistory,
        ...level3ROIHistory,
        ...dailyROIHistory,
        ...walletWithdrawHistory,
        ...capitalWithdrawHistory,
      ];

      // Filter objects based on reportName
      const filteredTransactions = allTransactions.filter(
        (transaction) => transaction.reportName === reportName
      );

      res
        .status(200)
        .json({
          allTransactions: filteredTransactions,
          userStatus,
          sts: "01",
          msg: "Successfully Updated",
        });
    } else {
      next(errorHandler("User not found, Please Login first"));
    }
  } catch (error) {
    next(error);
  }
};

export const viewChilds = async (req, res, next) => {
  try {
    const userId = req.query.id || req.user._id;

    // Fetch the user document by its ID and populate its child documents
    const user = await User.findById(userId)
      .select("childLevel1 childLevel2 childLevel3 ownSponserId userStatus")
      .populate([
        {
          path: "childLevel1",
          select:
            "username ownSponserId phone address email sponserName userStatus packageAmount packageName",
        },
        {
          path: "childLevel2",
          select:
            "username ownSponserId phone address email sponserName userStatus packageAmount packageName",
        },
        {
          path: "childLevel3",
          select:
            "username ownSponserId phone address email sponserName userStatus packageAmount packageName",
        },
      ]);

    // If user document is not found, return an error
    if (!user) {
      return next(errorHandler("User not found"));
    }

    // Destructure relevant fields from the user document
    const { childLevel1, childLevel2, childLevel3, ownSponserId, userStatus } =
      user;

    // Send the response with child documents and other relevant information
    res.status(200).json({
      child1: childLevel1,
      child2: childLevel2,
      child3: childLevel3,
      ownSponserId,
      userStatus,
      sts: "01",
      msg: "Success",
    });
  } catch (error) {
    next(error); // Pass any caught errors to the error handling middleware
  }
};

//view all packages

export const viewAllPackage = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const userData = await User.findById(userId);
    if (userData) {
      const PackageData = await Package.find();
      res
        .status(200)
        .json({ PackageData, sts: "01", msg: "Successfully Updated" });
    } else {
      next(errorHandler("User Not Found"));
    }
  } catch (error) {
    next(error);
  }
};

//view all packages

export const viewUserPackageDetails = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const userData = await User.findById(userId).populate("packageChosen");
    if (userData) {
      const PackageData = userData.packageChosen;
      if (PackageData) {
        res
          .status(200)
          .json({
            PackageData,
            sts: "01",
            msg: "Successfully Found Package data",
          });
      }
    } else {
      next(errorHandler("User Not Found"));
    }
  } catch (error) {
    next(error);
  }
};

// Add Fund to capital Amount by user

//change password

export const changePassword = async (req, res, next) => {
  const userId = req.user._id;
  const userData = await User.findById(userId);
  try {
    if (userData) {
      const { newPassword, confirmPassword } = req.body;
      if (newPassword) {
        const hashedPassword = bcryptjs.hashSync(newPassword, 10);
        userData.password = hashedPassword;
      }
      const updatedUser = await userData.save();

      res
        .status(200)
        .json({ updatedUser, sts: "01", msg: "Successfully Updated" });
    } else {
      next(errorHandler("User not found, Please Login first"));
    }
  } catch (error) {
    next(error);
  }
};

//change transation password

export const changeTxnPassword = async (req, res, next) => {
  const userId = req.user._id;
  const userData = await User.findById(userId);
  try {
    if (userData) {
      const { newPassword, confirmPassword } = req.body;
      if (newPassword) {
        const hashedPassword = bcryptjs.hashSync(newPassword, 10);
        userData.transactionPassword = hashedPassword;
      }
      const updatedUser = await userData.save();

      res
        .status(200)
        .json({ updatedUser, sts: "01", msg: "Successfully Updated" });
    } else {
      next(errorHandler("User not found, Please Login first"));
    }
  } catch (error) {
    next(error);
  }
};

//add topup by user

// export const AddFund=async(req,res,next)=>{
//   const userId=req.user._id;
//   const {amount,transactionCode}=req.body;
//   try {
//     const user=await User.findById(userId);
//     if(user){
//       user.addFundStatus = "pending";
//       user.topUpAmount=amount;
//       user.transactionCode=transactionCode;

//       const updatedUser = await user.save();

//       if (updatedUser) {
//         res.status(200).json({ msg: "User Fund top up request send to admin" });
//       }
//     } else {
//       next(errorHandler("User not Found"));
//     }

//   } catch (error) {
//     next(error)
//   }
//  }

// post capital amount
export const addPackageByUser = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const { amount, transactionCode, addFundUrl } = req.body;
    const userData = await User.findById(userId);
    if (userData) {
      if (userData.addPackageStatus == "approved") {
        userData.addFundStatus = "pending";
      } else {
        userData.addPackageStatus = "pending";
      }
      userData.topUpAmount = amount;
      userData.addFundUrl = addFundUrl;
      userData.transactionCode = transactionCode;

      const updatedUser = await userData.save();

      if (updatedUser) {
        res
          .status(200)
          .json({ updatedUser, msg: "User Fund top up request send to admin" });
      }
    } else {
      next(errorHandler("User not found, Please Login first"));
    }
  } catch (error) {
    next(error);
  }
};
// get add capital amount
export const getaddPackageByUser = async (req, res, next) => {
  const userId = req.user._id;
  const transactionID = generateTnxString();
  try {
    const userData = await User.findById(userId);

    if (userData) {
      userData.transactionID = transactionID;
      const updatedUser = await userData.save();

      if (updatedUser) {
        res
          .status(200)
          .json({
            transactionID,
            msg: "User Fund top up request send to admin",
          });
      }
    } else {
      next(errorHandler("User not found, Please Login first"));
    }
  } catch (error) {
    next(error);
  }
};

//withdraw capital by user

export const generateTnxString = () => {
  const baseString = "TNX";
  const randomDigits = Math.floor(Math.random() * 999999999);
  return baseString + randomDigits.toString();
};

export const capitalWithdraw = async (req, res, next) => {
  try {
    const transactionID = generateTnxString();
    const userId = req.user._id;
    const { amount, transactionPassword, capitalWithdrawUrl } = req.body;
    const userData = await User.findById(userId);

    if (userData) {
      const validPassword = bcryptjs.compareSync(
        transactionPassword,
        userData.transactionPassword
      );
      if (!validPassword) {
        return next(errorHandler(401, "Wrong Transaction Password"));
      } else {
        const capitalAmount = userData.packageAmount;
        const today = new Date();
        const capitalDay = new Date(userData.capitalDay);
        const ninetyDaysAgo = new Date(
          today.getTime() - 90 * 24 * 60 * 60 * 1000
        ); // 90 days in milliseconds

        if (today.getTime() - capitalDay.getTime() > 90 * 24 * 60 * 60 * 1000) {
          // Check if more than 90 days have passed
          if (capitalAmount >= amount) {
            userData.withdrawStatus = "pending";
            userData.withdrawAmount = amount;
            userData.capitalWithdrawUrl = capitalWithdrawUrl;
            userData.transactionID = transactionID;

            const updatedUser = await userData.save();

            if (updatedUser) {
              res
                .status(200)
                .json({
                  updatedUser,
                  msg: "User Capital withdraw request sent to admin",
                });
            }
          } else {
            return next(
              errorHandler(401, "Amount should less than Capital amount")
            );
          }
        } else {
          return next(
            errorHandler(
              401,
              "Withdraw only permitted after 90 days from the last fund addition"
            )
          );
        }
      }
    } else {
      next(errorHandler(401, "User not found, Please Login first"));
    }
  } catch (error) {
    next(error);
  }
};

//request for wallet withdrawal

export const walletWithdraw = async (req, res, next) => {
  try {
    const transactionID = generateTnxString();
    const userId = req.user._id;
    const { amount, transactionPassword, walletWithdrawUrl } = req.body;
    const userData = await User.findById(userId);
    const walletAmount = userData.walletAmount;
    if (userData) {
      const validPassword = bcryptjs.compareSync(
        transactionPassword,
        userData.transactionPassword
      );
      if (!validPassword) {
        return next(errorHandler(401, "Wrong Transaction Password"));
      } else {
        if (walletAmount >= amount) {
          userData.walletWithdrawStatus = "pending";
          userData.walletWithdrawAmount = amount;
          userData.walletWithdrawUrl = walletWithdrawUrl;
          userData.transactionID = transactionID;

          const updatedUser = await userData.save();

          if (updatedUser) {
            res
              .status(200)
              .json({
                updatedUser,
                msg: "User wallet withdraw request send to admin",
              });
          }
        } else {
          return next(
            errorHandler(401, "Amount should less than Wallet Amount")
          );
        }
      }
    } else {
      return next(errorHandler(401, "User not found, Please Login first"));
    }
  } catch (error) {
    next(error);
  }
};
