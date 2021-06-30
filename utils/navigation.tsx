import Constants from "expo-constants";

const storedAccessToken = Constants.manifest.extra?.accessToken;
const storedAccountIds = Constants.manifest.extra?.accountIds

export function getTransactionsNavigationVariables(newAccessToken, newAccountIds) {
  const accessToken = newAccessToken ? newAccessToken : storedAccessToken;
  const accountIds = newAccountIds ? newAccountIds : storedAccountIds;
  const now = new Date();
  const endDate = now.toISOString().slice(0, 10);
  const startDate = new Date(now.setDate(now.getDate()-30)).toISOString().slice(0, 10);
  const navigationVariables = { accessToken, accountIds, startDate, endDate };
  // console.log("Navigation Variables\n", navigationVariables);
  return navigationVariables;
}