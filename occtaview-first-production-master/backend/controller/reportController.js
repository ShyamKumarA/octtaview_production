import { errorHandler } from "../middleware/errorHandler.js";
import User from "../models/userModel.js";


//direct income report
export const directIncomeReport=async(req,res,next)=>{
    const userId = req.user._id;
  try {
    const userData = await User.findById(userId).populate("referalHistory")
    if (userData) {
      const userStatus=userData.userStatus
      const directIncome=userData.referalHistory
      console.log(directIncome);
      //.select("username email phone walletWithdrawStatus walletWithdrawAmount");
      res.status(200).json({
        directIncome,userStatus,
        sts: "01",
        msg: "get direct income report users Success",
      });
    } else {
      return next(errorHandler(401, "User Login Failed"));
    }
  } catch (error) {
    next(error);
  }
}

export const level1IncomeReport=async(req,res,next)=>{
    const userId = req.user._id;
  try {
    const userData = await User.findById(userId).populate("level1ROIHistory")
    if (userData) {
      const userStatus=userData.userStatus;
      const level1Income=userData.level1ROIHistory
      //.select("username email phone walletWithdrawStatus walletWithdrawAmount");
      res.status(200).json({
        level1Income,userStatus,
        sts: "01",
        msg: "get level 1 ROI income report users Success",
      });
    } else {
      return next(errorHandler(401, "User Login Failed"));
    }
  } catch (error) {
    next(error);
  }
}

export const level2IncomeReport=async(req,res,next)=>{
    const userId = req.user._id;
  try {
    const userData = await User.findById(userId).populate("level2ROIHistory")
    if (userData) {
      const userStatus=userData.userStatus;

      const level2Income=userData.level2ROIHistory
      //.select("username email phone walletWithdrawStatus walletWithdrawAmount");
      res.status(200).json({
        level2Income,userStatus,
        sts: "01",
        msg: "get level 2 ROI income report users Success",
      });
    } else {
      return next(errorHandler(401, "User Login Failed"));
    }
  } catch (error) {
    next(error);
  }
}

export const level3IncomeReport=async(req,res,next)=>{
    const userId = req.user._id;
  try {
    const userData = await User.findById(userId).populate("level3ROIHistory")

    if (userData) {
      const userStatus=userData.userStatus;

      const level3Income=userData.level3ROIHistory
      //.select("username email phone walletWithdrawStatus walletWithdrawAmount");
      res.status(200).json({
        level3Income,userStatus,
        sts: "01",
        msg: "get level 1 ROI income report users Success",
      });
    } else {
      return next(errorHandler(401, "User Login Failed"));
    }
  } catch (error) {
    next(error);
  }
}


//daily ROI report

export const dailyROIReport=async(req,res,next)=>{
    const userId = req.user._id;
  try {
    const userData = await User.findById(userId).populate("dailyROIHistory")
    if (userData) {
      const userStatus=userData.userStatus;
      const dailyROIHistory=userData.dailyROIHistory
      //.select("username email phone walletWithdrawStatus walletWithdrawAmount");
      res.status(200).json({
        dailyROIHistory,userStatus,
        sts: "01",
        msg: "get level 1 ROI income report users Success",
      });
    } else {
      return next(errorHandler(401, "User Login Failed"));
    }
  } catch (error) {
    next(error);
  }
}


//Wallet withdraw report

export const walletWithdrawReport=async(req,res,next)=>{
    const userId = req.user._id;
  try {
    const userData = await User.findById(userId).populate("walletWithdrawHistory")
    if (userData) {
      const walletWithdrawHistory=userData.walletWithdrawHistory
      const userStatus=userData.userStatus;
      //.select("username email phone walletWithdrawStatus walletWithdrawAmount");
      res.status(200).json({
        walletWithdrawHistory,
        walletAmount:userData.walletAmount,
        totalRefferalAmount:userData.referalIncome,
        totalDailyBonus:userData.dailyROI,
        userStatus,
        sts: "01",
        msg: "get wallet withdrawal report users Success",
      });
    } else {
      return next(errorHandler(401, "User Login Failed"));
    }
  } catch (error) {
    next(error);
  }
}

//fund add history
export const addFundHistory = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const userData = await User.findById(userId).populate("addFundHistory");
    const arrayOfUsers=[];
    const newUserData={
      "name":userData.username,
      "topUpAmount":userData.topUpAmount,
      "transactionCode":userData.transactionCode,
      "status":userData.addPackageStatus
    }
    arrayOfUsers.push(newUserData);
    if (userData) {
      const addFundHistory = userData.addFundHistory || [];

      const userStatus=userData.userStatus;

      const allFundHistory = [
        ...arrayOfUsers,
        ...addFundHistory,
      ];
      console.log(allFundHistory);


      if (userData.addFundStatus == "pending" || userData.addPackageStatus == "pending") {
        res.status(200).json({
          allFundHistory,
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
    const arrayOfUsers=[];
    const newUserData={
      "name":userData.username,
      "topUpAmount":userData.topUpAmount,
      "transactionCode":userData.transactionCode,
      "status":userData.addPackageStatus
    }
    arrayOfUsers.push(newUserData);
    if (userData) {
      const dailyROIHistory = userData.dailyROIHistory || [];

      const userStatus=userData.userStatus;

      console.log(dailyROIHistory);


        res.status(200).json({
          dailyROIHistory,
          packagename: userData.packageName,
          totalCapitalAmount: userData.packageAmount,
          userStatus,
          sts: "01",
          msg: "get Package Fund add pending user Success",
        });
      }
     else {
      return next(errorHandler(401, "User Login Failed"));
    }
  } catch (error) {
    next(error);
  }
};


//capital withdraw report

export const capitalWithdrawReport=async(req,res,next)=>{
    const userId = req.user._id;
  try {
    const userData = await User.findById(userId).populate("capitalWithdrawHistory")
    if (userData) {
      const userStatus=userData.userStatus;
      const capitalWithdrawHistory=userData.capitalWithdrawHistory
      //.select("username email phone walletWithdrawStatus walletWithdrawAmount");
      res.status(200).json({
        capitalWithdrawHistory,
        totalCapitalAmount:userData.packageAmount,
        userStatus,
        sts: "01",
        msg: "get wallet withdrawal report users Success",
      });
    } else {
      return next(errorHandler(401, "User Login Failed"));
    }
  } catch (error) {
    next(error);
  }
}