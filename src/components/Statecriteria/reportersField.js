const reportersField = {
  id: { type: "id", label: "ID" },
  ictFund: {
    type: "string",
    options: [
      { value: "0", label: "0%" },
      { value: "5", label: "0-2%" },
      { value: "10", label: "3-5%" },
      { value: "15", label: "6-10%" },
      { value: "20", label: "Above 10%" },
    ],
    label: "% of state budget allocated to ICT Initiatives",
  },

  percentageOfBudget: {
    type: "string",
    label:
      "Existence of specialized intervention fund or grants for ICT start-ups ",

    options: [
      { value: "5", label: "Yes" },
      { value: "0", label: "No" },
    ],
  },

  presenceOfIctProjects: {
    type: "string",
    options: [
      { value: "0", label: "No Project" },
      { value: "1", label: "One Project" },
      { value: "2", label: "Two Projects" },
      { value: "3", label: "Three Projects" },
      { value: "4", label: "Four Projects" },
      { value: "5", label: "Five or more Projects" },
    ],
    label: "Evidence of ongoing viable ICT projects",
  },

  ictMinistry: {
    type: "string",
    label:
      "Existence of a specialized Ministry or Agency managing ICT in state",

    options: [
      { value: "8", label: "Yes" },
      { value: "0", label: "No" },
    ],
  },

  stateIctPolicy: {
    type: "string",
    label: "Existence of a state ICT Policy",

    options: [
      { value: "6", label: "Yes" },
      { value: "0", label: "No" },
    ],
  },

  officialMailUse: {
    type: "string",
    label: "Adherence to use of official email by civil servants in the state ",
    options: [
      { value: "6", label: "Everyone" },
      { value: "4", label: "Majority" },
      { value: "2", label: "Minority" },
      { value: "0", label: "None" },
    ],
  },

  officialInternetProvision: {
    type: "string",
    label:
      "Is internet free and readily available for cilvil servants in the state secretariat?",
    options: [
      { value: "3", label: "Yes" },
      { value: "0", label: "No" },
    ],
  },
  officialInternetSpeed: {
    type: "string",
    label: "Internet speed as adjudged by infrastructure in place",
    options: [
      { value: "0", label: "Inexistent" },
      { value: "1", label: "Slow" },
      { value: "2", label: "fast" },
      { value: "3", label: "Very fast" },
    ],
  },

  videoConferenceUse: {
    type: "string",
    label: "Level of use of video conferencing platforms for meetings ",
    options: [
      { value: "0", label: "Not at all" },
      { value: "1", label: "Occasionally" },
      { value: "2", label: "Frequently" },
      { value: "3", label: "Standard practice " },
    ],
  },

  intranetUse: {
    type: "string",
    label: "Use of intranet within government institutions",
    options: [
      { value: "3", label: "Yes" },
      { value: "0", label: "No" },
    ],
  },

  ict4Learning: {
    type: "string",
    label:
      " Education (use of magic board in at least 50% of state-owned primary & secondary schools) ",
    options: [
      { value: "3", label: "Yes" },
      { value: "0", label: "No" },
    ],
  },

  ict4HealthRecords: {
    type: "string",
    label:
      "   Health (use of an electronic medical records (EMRs) in at least 50% of state owned hospitals)",
    options: [
      { value: "1", label: "Yes" },
      { value: "0", label: "No" },
    ],
  },
  presenceofTelemedicine: {
    type: "string",
    label: "    Use of telemedicine services within state owned hospitals",
    options: [
      { value: "1", label: "Yes" },
      { value: "0", label: "No" },
    ],
  },

  digitizedLandRecords: {
    type: "string",
    label: "Land Administration (digitization of land administration process)",
    options: [
      { value: "0", label: "Not at all" },
      { value: "1", label: "Partially " },
      { value: "2", label: "Fully automated" },
    ],
  },

  digitizedJudiciary: {
    type: "string",
    label:
      "Judiciary (digitization of court proceedings including awaiting trial cases) ",
    options: [
      { value: "0", label: "Not at all" },
      { value: "1", label: "Work in progress" },
      { value: "2", label: "Fully automated" },
    ],
  },
  digitizedAgric: {
    type: "string",
    label:
      "Agriculture (use of technology to upscale agricultural output in state)",
    options: [
      { value: "2", label: "Yes" },
      { value: "0", label: "No" },
    ],
  },
  ecommerceIncentives: {
    type: "string",
    label:
      "Industry, Trade and Commerce (sponsored use of eCommerce platforms in state)",
    options: [
      { value: "2", label: "Yes" },
      { value: "0", label: "No" },
    ],
  },

  stateIctSystemDeploment: {
    type: "string",
    label: "Level of deployment",
    options: [
      { value: "0", label: "None is available" },
      { value: "1", label: "< 50% of civil servants have systems" },
      { value: "2", label: "> 50% < 100% of civil servants have systems" },
      { value: "3", label: "All civil servants have a system " },
      //
    ],
  },

  stateITDepartment: {
    type: "string",
    label:
      "Is there internal capacity to maintain the computer systems within the state civil service? ",
    options: [
      { value: "2", label: "Yes" },
      { value: "0", label: "No" },
    ],
  },
  digitizedFiling: {
    type: "string",
    label: "Use of an electronic filing system in the state secretariat?",
    options: [
      { value: "3", label: "Yes" },
      { value: "0", label: "No" },
    ],
  },
  cyberSecurityInfra: {
    type: "string",
    label:
      "Existence of a cybersecurity infrastructure within the states ICT infrastructure",
    options: [
      { value: "2", label: "Yes" },
      { value: "0", label: "No" },
    ],
  },
  startupDb: {
    type: "string",
    label: "Existence of database of registered start ups in state",
    options: [
      { value: "2", label: "Yes" },
      { value: "0", label: "No" },
    ],
  },

  startupInvestmentVolume: {
    type: "string",
    label:
      "Volume of Local or Foreign Direct Investment attracted to state courtesy start ups",
    options: [
      { value: "0", label: "Nil" },
      { value: "1", label: "< N100m " },
      { value: "2", label: "> N100m " },
    ],
  },
  startUpDirectJobs: {
    type: "string",
    label: "How many direct jobs were created courtesy start ups in the state",
    options: [
      { value: "0", label: "Nil" },
      { value: "1", label: "< 100 " },
      { value: "2", label: "> 100 " },
    ],
  },

  stateWebsiteFunctionality: {
    type: "string",
    label: "Functionality",
    options: [
      { value: "0", label: "Poor" },
      { value: "1", label: "Good" },
      { value: "2", label: "Excellent" },
    ],
  },
  stateWebsiteUI: {
    type: "string",
    label: "Interface and user friendliness",
    options: [
      { value: "0", label: "Poor" },
      { value: "1", label: "Good" },
      { value: "2", label: "Excellent" },
    ],
  },

  stateWebsiteSecurity: {
    type: "string",
    label: "Security and safety features",
    options: [
      { value: "0", label: "Poor" },
      { value: "1", label: "Good" },
      { value: "2", label: "Excellent" },
    ],
  },

  iCTUpskill: {
    type: "string",
    label:
      "Are there opportunities for civil servants in the state to upskill with regards to ICT (evidence of courses and training funded by state).",
    options: [
      { value: "2", label: "Yes" },
      { value: "0", label: "No" },
    ],
  },

  certifiedITPersonnel: {
    type: "string",
    label: "Availability of ICT certified personnel in the state civil service",
    options: [
      { value: "2", label: "Yes" },
      { value: "0", label: "No" },
    ],
  },
  states: {
    type: "string",
    label: "States",
    options: [
      { value: "Abia", label: "Abia" },
      { value: "Adamawa", label: "Adamawa" },
      { value: "Akwa Ibom", label: "Akwa Ibom" },
      { value: "Anambra", label: "Anambra" },
      { value: "Bauchi", label: "Bauchi" },
      { value: "Benue", label: "Benue" },
      { value: "Borno", label: "Borno" },
      { value: "Bayelsa", label: "Bayelsa" },
      { value: "Cross River", label: "Cross River" },
      { value: "Delta", label: "Delta" },
      { value: "Ebonyi", label: "Ebonyi" },
      { value: "Edo", label: "Edo" },
      { value: "Ekiti", label: "Ekiti" },
      { value: "Enugu", label: "Enugu" },
      {
        value: "Federal Capital Territory",
        label: "Federal Capital Territory",
      },
      { value: "Gombe", label: "Gombe" },
      { value: "Imo", label: "Imo" },
      { value: "Jigawa", label: "Jigawa" },
      { value: "Kaduna", label: "Kaduna" },
      { value: "Kebbi", label: "Kebbi" },
      { value: "Kogi", label: "Kogi" },
      { value: "Kwara", label: "Kwara" },
      { value: "Lagos", label: "Lagos" },
      { value: "Nasarawa", label: "Nasarawa" },
      { value: "Niger", label: "Niger" },
      { value: "Ogun", label: "Ogun" },
      { value: "Ondo", label: "Ondo" },
      { value: "Osun", label: "Osun" },
      { value: "Oyo", label: "Oyo" },
      { value: "Plateau", label: "Plateau" },
      { value: "Rivers", label: "Rivers" },
      { value: "Sokoto", label: "Sokoto" },
      { value: "Taraba", label: "Taraba" },
      { value: "Yobe", label: "Yobe" },
      { value: "Zamfara", label: "Zamfara" },
    ],
  },
};

export default reportersField;

export const showReport = {
  certifiedITPersonnel: { 2: "Yes", 0: "No" },
  createdAt: "2023-12-27T06:42:27.006Z",
  cyberSecurityInfra: { 2: "Yes", 0: "No" },
  digitizedAgric: { 2: "Yes", 0: "No" },
  digitizedFiling: { 3: "Yes", 0: "No" },
  digitizedJudiciary: {
    0: "Not at all",
    1: "Work in progress",
    2: "Fully automated",
  },
  digitizedLandRecords: {
    0: "Not at all",
    1: "Partially ",
    2: "Fully automated",
  },
  ecommerceIncentives: { 2: "Yes", 0: "No" },
  iCTUpskill: { 2: "Yes", 0: "No" },
  ict4HealthRecords: { 1: "Yes", 0: "No" },
  ict4Learning: { 3: "Yes", 0: "No" },
  ictFund: { 0: "0%", 5: "0-2%", 10: "3-5%", 15: "6-10%", 20: "Above 10%" },
  ictMinistry: { 8: "Yes", 0: "No" },
  id: "65f204b5-a9b8-4667-8874-9682da53df93",
  intranetUse: { 3: "Yes", 0: "No" },
  officialInternetProvision: { 3: "Yes", 0: "No" },
  officialInternetSpeed: {
    0: "Inexistent",
    1: "Slow",
    2: "fast",
    3: "Very fast",
  },
  officialMailUse: { 6: "Everyone", 4: "Majority", 2: "Minority", 0: "None" },
  percentageOfBudget: { 5: "Yes", 0: "No" },
  presenceOfIctProjects: {
    0: "No Project",
    1: "One Project",
    2: "Two Projects",
    3: "Three Projects",
    4: "Four Projects",
    5: "Five or more Projects",
  },
  presenceofTelemedicine: { 1: "Yes", 0: "No" },
  startUpDirectJobs: { 0: "Nil", 1: "< 100 ", value: "2", label: "> 100 " },
  startupDb: { 2: "Yes", 0: "No" },
  startupInvestmentVolume: { 0: "Nil", 1: "< N100m", 2: "> N100m " },
  state: "Kebbi",
  stateITDepartment: { 2: "Yes", 0: "No" },
  stateIctPolicy: { 6: "Yes", 0: "No" },
  stateIctSystemDeploment: {
    0: "None is available",
    1: "< 50% of civil servants have systems",
    2: "> 50% < 100% of civil servants have systems",
    3: "All civil servants have a system ",
  },
  stateWebsiteFunctionality: { 0: "Poor", 1: "Good", 2: "Excellent" },
  stateWebsiteSecurity: { 0: "Poor", 1: "Good", 2: "Excellent" },
  stateWebsiteUI: { 0: "Poor", 1: "Good", 2: "Excellent" },
  // "updatedAt":2023-12-27T06:42:27.006Z,
  videoConferenceUse: {
    0: "Not at all",
    1: "Occasionally",
    2: "Frequently",
    3: "Standard practice ",
  },
  state: {
    Abia: "Abia",
    Adamawa: "Adamawa",
    "Akwa Ibom": "Akwa Ibom",
    Anambra: "Anambra",
    Bauchi: "Bauchi",
    Benue: "Benue",
    Borno: "Borno",
    Bayelsa: "Bayelsa",
    "Cross River": "Cross River",
    Delta: "Delta",
    Ebonyi: "Ebonyi",
    Edo: "Edo",
    Ekiti: "Ekiti",
    Enugu: "Enugu",
    "Federal Capital Territory": "Federal Capital Territory",
    Gombe: "Gombe",
    Imo: "Imo",
    Jigawa: "Jigawa",
    Kaduna: "Kaduna",
    Kebbi: "Kebbi",
    Kogi: "Kogi",
    Kwara: "Kwara",
    Lagos: "Lagos",
    Nasarawa: "Nasarawa",
    Niger: "Niger",
    Ogun: "Ogun",
    Ondo: "Ondo",
    Osun: "Osun",
    Oyo: "Oyo",
    Plateau: "Plateau",
    Rivers: "Rivers",
    Sokoto: "Sokoto",
    Taraba: "Taraba",
    Yobe: "Yobe",
    Zamfara: "Zamfara",
  },
};

export const mapValuesFromReport = (reportObject, dataObject) => {
  const result = {};

  for (const key in dataObject) {
    const dataValue = dataObject[key];

    if (typeof dataValue === "object") {
      // If the value is an object, recursively call the function
      result[key] = mapValuesFromReport(reportObject[key], dataValue);
    } else {
      // If the value is not an object, use it to get the corresponding value from the reportObject
      const reportKey = reportObject[key];
      result[key] = reportKey ? reportKey[dataValue] : null;
    }
  }

  return result;
};
