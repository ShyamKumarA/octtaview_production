import { errorHandler } from "../middleware/errorHandler.js";
import User from "../models/userModel.js";

//direct income report
export const directIncomeReport = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const userData = await User.findById(userId).populate("referalHistory");
    if (userData) {
      const userStatus = userData.userStatus;
      const directIncome = userData.referalHistory;
      //.select("username email phone walletWithdrawStatus walletWithdrawAmount");
      res.status(200).json({
        directIncome,
        userStatus,
        sts: "01",
        msg: "get direct income report users Success",
      });
    } else {
      return next(errorHandler(401, "User Login Failed"));
    }
  } catch (error) {
    next(error);
  }
};

export const level1IncomeReport = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const userData = await User.findById(userId).populate("level1ROIHistory");
    if (userData) {
      const userStatus = userData.userStatus;
      const level1Income = userData.level1ROIHistory;
      //.select("username email phone walletWithdrawStatus walletWithdrawAmount");
      res.status(200).json({
        level1Income,
        userStatus,
        sts: "01",
        msg: "get level 1 ROI income report users Success",
      });
    } else {
      return next(errorHandler(401, "User Login Failed"));
    }
  } catch (error) {
    next(error);
  }
};

export const level2IncomeReport = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const userData = await User.findById(userId).populate("level2ROIHistory");
    if (userData) {
      const userStatus = userData.userStatus;

      const level2Income = userData.level2ROIHistory;
      //.select("username email phone walletWithdrawStatus walletWithdrawAmount");
      res.status(200).json({
        level2Income,
        userStatus,
        sts: "01",
        msg: "get level 2 ROI income report users Success",
      });
    } else {
      return next(errorHandler(401, "User Login Failed"));
    }
  } catch (error) {
    next(error);
  }
};

export const level3IncomeReport = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const userData = await User.findById(userId).populate("level3ROIHistory");

    if (userData) {
      const userStatus = userData.userStatus;

      const level3Income = userData.level3ROIHistory;
      //.select("username email phone walletWithdrawStatus walletWithdrawAmount");
      res.status(200).json({
        level3Income,
        userStatus,
        sts: "01",
        msg: "get level 1 ROI income report users Success",
      });
    } else {
      return next(errorHandler(401, "User Login Failed"));
    }
  } catch (error) {
    next(error);
  }
};

//view all level Report

export const viewAllLevelReport = async (req, res, next) => {
  try {
    const userId = req.query.id || req.user._id;

    // Fetch the user document by its ID and populate its child documents
    const user = await User.findById(userId)
      .select(
        "level1ROIHistory level2ROIHistory level3ROIHistory ownSponserId userStatus"
      )
      .populate([
        {
          path: "level1ROIHistory",
          select:
            "username ownSponserId phone address email userStatus packageAmount packageName",
        },
        {
          path: "level2ROIHistory",
          select:
            "username ownSponserId phone address email userStatus packageAmount packageName",
        },
        {
          path: "level3ROIHistory",
          select:
            "username ownSponserId phone address email userStatus packageAmount packageName",
        },
      ]);

    // If user document is not found, return an error
    if (!user) {
      return next(errorHandler("User not found"));
    }

    // Destructure relevant fields from the user document
    const {
      level1ROIHistory,
      level2ROIHistory,
      level3ROIHistory,
      ownSponserId,
      userStatus,
    } = user;

    // Send the response with child documents and other relevant information
    res.status(200).json({
      level1ROIHistory,
      level2ROIHistory,
      level3ROIHistory,
      ownSponserId,
      userStatus,
      sts: "01",
      msg: "Success",
    });
  } catch (error) {
    next(error); // Pass any caught errors to the error handling middleware
  }
};

//daily ROI report

export const dailyROIReport = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const userData = await User.findById(userId).populate("dailyROIHistory");
    if (userData) {
      const userStatus = userData.userStatus;
      const dailyROIHistory = userData.dailyROIHistory;
      //.select("username email phone walletWithdrawStatus walletWithdrawAmount");
      res.status(200).json({
        dailyROIHistory,
        userStatus,
        sts: "01",
        msg: "get level ROI History income report users Success",
      });
    } else {
      return next(errorHandler(401, "User Login Failed"));
    }
  } catch (error) {
    next(error);
  }
};

//Wallet withdraw report

export const walletWithdrawReport = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const userData = await User.findById(userId).populate(
      "walletWithdrawHistory"
    );

    const arrayOfWithdraw = [];
    const newWithdrawData = {
      name: userData.username,
      reportName: "walletWithdrawReport",
      ownID: userData.ownSponserId,
      packageName: userData.packageName,
      txnID: userData.transactionID,
      withdrawAmount: userData.walletWithdrawAmount,
      walletUrl: userData.walletWithdrawUrl,
      status: "Pending",
      createdAt: userData.createdAt,
    };
    arrayOfWithdraw.push(newWithdrawData);

    if (userData) {
      const walletWithdrawHistory = userData.walletWithdrawHistory || [];
      const userStatus = userData.userStatus;

      const allwalletWithdrawHistory = [
        ...arrayOfWithdraw,
        ...walletWithdrawHistory,
      ];

      if (userData.walletWithdrawStatus == "pending") {
        res.status(200).json({
          walletWithdrawHistory: allwalletWithdrawHistory,
          walletAmount: userData.walletAmount,
          totalRefferalAmount: userData.referalIncome,
          totalDailyBonus: userData.dailyROI,
          userStatus,
          sts: "01",
          msg: "get wallet withdrawal report users Success",
        });
      } else {
        res.status(200).json({
          walletWithdrawHistory,
          walletAmount: userData.walletAmount,
          totalRefferalAmount: userData.referalIncome,
          totalDailyBonus: userData.dailyROI,
          userStatus,
          sts: "01",
          msg: "get wallet withdrawal report users Success",
        });
      }
    } else {
      return next(errorHandler(401, "User Login Failed"));
    }
  } catch (error) {
    next(error);
  }
};

//fund add history
export const addFundHistory = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const userData = await User.findById(userId).populate("addFundHistory");
    const arrayOfUsers = [];
    const newUserData = {
      name: userData.username,
      topUpAmount: userData.topUpAmount,
      transactionCode: userData.transactionCode,
      status: "Pending",
      createdAt: userData.createdAt,
    };
    arrayOfUsers.push(newUserData);
    if (userData) {
      const addFundHistory = userData.addFundHistory || [];

      const userStatus = userData.userStatus;

      const allFundHistory = [...arrayOfUsers, ...addFundHistory];

      if (
        userData.addFundStatus == "pending" ||
        userData.addPackageStatus == "pending"
      ) {
        res.status(200).json({
          addFundHistory: allFundHistory,
          packagename: userData.packageName,
          totalCapitalAmount: userData.packageAmount,
          userStatus,
          sts: "01",
          msg: "get Package Fund add pending user Success",
        });
      } else {
        res.status(200).json({
          addFundHistory,
          packagename: userData.packageName,
          totalCapitalAmount: userData.packageAmount,
          userStatus,
          sts: "01",
          msg: "get Package Fund add pending user Success",
        });
      }
    } else {
      return next(errorHandler(401, "User Login Failed"));
    }
  } catch (error) {
    next(error);
  }
};

//Get Roi History
export const ROIHistory = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const userData = await User.findById(userId).populate("dailyROIHistory");
    if (userData) {
      const dailyROIHistory = userData.dailyROIHistory || [];

      const userStatus = userData.userStatus;

      res.status(200).json({
        dailyROIHistory,
        packagename: userData.packageName,
        totalCapitalAmount: userData.packageAmount,
        userStatus,
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

//capital withdraw report

export const capitalWithdrawReport = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const userData = await User.findById(userId).populate(
      "capitalWithdrawHistory"
    );
    const arrayOfWithdraw = [];
    const newWithdrawData = {
      name: userData.username,
      reportName: "capitalWithdrawReport",
      ownID: userData.ownSponserId,
      packageName: userData.packageName,
      txnID: userData.transactionID,
      withdrawAmount: userData.withdrawAmount,
      walletUrl: userData.capitalWithdrawUrl,
      status: "Pending",
      createdAt: userData.createdAt,
    };
    arrayOfWithdraw.push(newWithdrawData);

    if (userData) {
      const userStatus = userData.userStatus;
      const capitalWithdrawHistory = userData.capitalWithdrawHistory;

      const allcapitalWithdrawHistory = [
        ...arrayOfWithdraw,
        ...capitalWithdrawHistory,
      ];

      if (userData.withdrawStatus == "pending") {
        res.status(200).json({
          capitalWithdrawHistory: allcapitalWithdrawHistory,
          totalCapitalAmount: userData.packageAmount,
          userStatus,
          sts: "01",
          msg: "get capital withdrawal report users Success",
        });
      } else {
        res.status(200).json({
          capitalWithdrawHistory,
          totalCapitalAmount: userData.packageAmount,
          userStatus,
          sts: "01",
          msg: "get capital withdrawal report users Success",
        });
      }
    } else {
      return next(errorHandler(401, "User Login Failed"));
    }
  } catch (error) {
    next(error);
  }
};
