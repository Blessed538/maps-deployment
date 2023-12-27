import { Formik } from "formik";
import React, { useEffect } from "react";
import DropdownFormItem from "components/FormItems/items/DropdownFormItem";
import RadioFormItem from "components/FormItems/items/RadioFormItem";
import usersFields from "../reportersField";
import IniValues from "components/FormItems/iniValues";
import PreparedValues from "components/FormItems/preparedValues";
import FormValidations from "components/FormItems/formValidations";
import Widget from "components/Widget";
import { Label } from "reactstrap";
import { createReport, updateReport } from "../../../actions/reports";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { reportActions } from "../../../actions/reports";
import { withRouter } from "react-router-dom";
import { mapValuesFromReport, showReport } from "../reportersField";

const EditReportForm = (props) => {
  const dispatch = useDispatch();
  const report = useSelector((state) => state.reports.report.reportData);
  const { match } = props;

  const userId = match.params.id;

  const result = mapValuesFromReport(showReport, report);

  console.log("result", result.ictFund);

  useEffect(() => {
    const fetchReport = () => {
      dispatch(reportActions(userId, "view"));
    };
    fetchReport();
  }, []);

  const iniValues = () => {
    return IniValues(usersFields, {});
  };

  const formValidations = () => {
    return FormValidations(usersFields, {});
  };

  const handleSubmit = async (values) => {
    console.log({ values });
    try {
      const { id, ...data } = PreparedValues(usersFields, values || {});
      console.log({ data });
      dispatch(updateReport(userId, values));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const renderForm = () => {
    return (
      <Widget>
        <Formik
          onSubmit={handleSubmit}
          initialValues={iniValues()}
          validationSchema={formValidations()}
          render={(form) => {
            return (
              <form onSubmit={form.handleSubmit}>
                <Label className="col-form-label-lg mt-3">Select a State</Label>
                <DropdownFormItem
                  defaultValue={result.state}
                  name={"states"}
                  schema={usersFields}
                />

                <Label className="col-form-label-lg mt-3">
                  State budget allocation to ICT development
                </Label>
                <DropdownFormItem
                  defaultValue={result.ictFund}
                  name={"ictFund"}
                  schema={usersFields}
                />

                <RadioFormItem
                  defaultValue={result.percentageOfBudget}
                  name={"percentageOfBudget"}
                  schema={usersFields}
                />
                <DropdownFormItem
                  defaultValue={result.presenceOfIctProjects}
                  name={"presenceOfIctProjects"}
                  schema={usersFields}
                />
                <Label className="col-form-label-lg mt-3">
                  Governance systems
                </Label>
                <RadioFormItem
                  defaultValue={result.ictMinistry}
                  name={"ictMinistry"}
                  schema={usersFields}
                />
                <RadioFormItem
                  defaultValue={result.stateIctPolicy}
                  name={"stateIctPolicy"}
                  schema={usersFields}
                />
                <DropdownFormItem
                  defaultValue={result.officialMailUse}
                  name={"officialMailUse"}
                  schema={usersFields}
                />

                <Label className="col-form-label-lg mt-3">
                  Internet availability and speed
                </Label>
                <RadioFormItem
                  defaultValue={result.officialInternetProvision}
                  name={"officialInternetProvision"}
                  schema={usersFields}
                />
                <DropdownFormItem
                  defaultValue={result.officialInternetSpeed}
                  name={"officialInternetSpeed"}
                  schema={usersFields}
                />
                <DropdownFormItem
                  name={"videoConferenceUse"}
                  defaultValue={result.videoConferenceUse}
                  schema={usersFields}
                />

                <RadioFormItem
                  defaultValue={result.intranetUse}
                  name={"intranetUse"}
                  schema={usersFields}
                />

                <Label className="col-form-label-lg mt-3">
                  Level of ICT reforms/advancement in the following sectors
                </Label>
                <RadioFormItem
                  defaultValue={result.ict4Learning}
                  name={"ict4Learning"}
                  schema={usersFields}
                />
                <RadioFormItem
                  defaultValue={result.ict4HealthRecords}
                  name={"ict4HealthRecords"}
                  schema={usersFields}
                />
                <RadioFormItem
                  defaultValue={result.presenceofTelemedicine}
                  name={"presenceofTelemedicine"}
                  schema={usersFields}
                />
                <DropdownFormItem
                  defaultValue={result.digitizedLandRecords}
                  name={"digitizedLandRecords"}
                  schema={usersFields}
                />
                <DropdownFormItem
                  defaultValue={result.digitizedJudiciary}
                  name={"digitizedJudiciary"}
                  schema={usersFields}
                />
                <RadioFormItem
                  defaultValue={result.digitizedAgric}
                  name={"digitizedAgric"}
                  schema={usersFields}
                />
                <RadioFormItem
                  defaultValue={result.ecommerceIncentives}
                  name={"ecommerceIncentives"}
                  schema={usersFields}
                />

                <Label className="col-form-label-lg mt-3">
                  Deployment of computer systems in state secretariat
                </Label>

                <DropdownFormItem
                  defaultValue={result.stateIctSystemDeploment}
                  name={"stateIctSystemDeploment"}
                  schema={usersFields}
                />

                <RadioFormItem
                  defaultValue={result.stateITDepartment}
                  name={"stateITDepartment"}
                  schema={usersFields}
                />
                <RadioFormItem
                  defaultValue={result.digitizedFiling}
                  name={"digitizedFiling"}
                  schema={usersFields}
                />

                <RadioFormItem
                  defaultValue={result.cyberSecurityInfra}
                  name={"cyberSecurityInfra"}
                  schema={usersFields}
                />

                <Label className="col-form-label-lg mt-3">
                  Startup Ecosystem
                </Label>

                <RadioFormItem
                  defaultValue={result.startupDb}
                  name={"startupDb"}
                  schema={usersFields}
                />
                <DropdownFormItem
                  defaultValue={result.startupInvestmentVolume}
                  name={"startupInvestmentVolume"}
                  schema={usersFields}
                />

                <DropdownFormItem
                  defaultValue={result.startUpDirectJobs}
                  name={"startUpDirectJobs"}
                  schema={usersFields}
                />

                <Label className="col-form-label-lg mt-3">
                  Status of State Official Website
                </Label>

                <DropdownFormItem
                  defaultValue={result.stateWebsiteFunctionality}
                  name={"stateWebsiteFunctionality"}
                  schema={usersFields}
                />

                <DropdownFormItem
                  name={"stateWebsiteUI"}
                  defaultValue={result.stateWebsiteUI}
                  schema={usersFields}
                />

                <DropdownFormItem
                  defaultValue={result.stateWebsiteSecurity}
                  name={"stateWebsiteSecurity"}
                  schema={usersFields}
                />

                <Label className="col-form-label-lg mt-3">
                  Staff ICT proficiency
                </Label>
                <RadioFormItem
                  defaultValue={result.iCTUpskill}
                  name={"iCTUpskill"}
                  schema={usersFields}
                />

                <RadioFormItem
                  defaultValue={result.certifiedITPersonnel}
                  name={"certifiedITPersonnel"}
                  schema={usersFields}
                />

                <div className="form-buttons mt-4">
                  {/* <button
                    className="btn btn-primary me-3"
                    // disabled={saveLoading}
                    type="button"
                    onClick={form.handleSubmit}
                  >
                    Save
                  </button> */}
                  {/* <button
                    className="btn btn-light me-3"
                    type="button"
                    onClick={form.handleReset}
                  >
                    Edit
                  </button> */}
                  <button
                    className="btn btn-light"
                    type="button"
                    onClick={form.handleSubmit}
                  >
                    Edit Report
                  </button>
                </div>
              </form>
            );
          }}
        />
      </Widget>
    );
  };

  return renderForm();
};

export default withRouter(EditReportForm);
