import React, { useEffect } from "react";
import Loader from "components/Loader";
import Widget from "components/Widget";
import { Label } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import TextViewItem from "../../FormItems/items/TextViewItem";
import { withRouter } from "react-router-dom";
import { reportActions } from "../../../actions/reports";
import { showReport, mapValuesFromReport } from "../reportersField";

const ViewReport = (props) => {
  const dispatch = useDispatch();
  const report = useSelector((state) => state.reports.report.reportData);
  const { match } = props;

  const userId = match.params.id;

  const result = mapValuesFromReport(showReport, report);

  useEffect(() => {
    const fetchReport = () => {
      dispatch(reportActions(userId, "view"));
    };
    fetchReport();
  }, []);

  const renderForm = () => {
    return (
      <Widget title={<h4>Edit Report</h4>}>
        <Label className="col-form-label-lg mt-3">
          State budget allocation to ICT development
        </Label>
        <TextViewItem
          value={result.ictFund}
          label="% of state budget allocated to ICT Initiatives"
        />
        <TextViewItem
          value={result.percentOfBudget}
          label="Existence of specialized intervention fund or grants for ICT start-ups"
        />
        <TextViewItem
          value={result.presenceOfIctProjects}
          label="Evidence of ongoing viable ICT projects"
        />
        <Label className="col-form-label-lg mt-3">Governance systems</Label>
        <TextViewItem
          value={result.ictMinistry || ""}
          label="Existence of a specialized Ministry or Agency managing ICT in state"
        />
        <TextViewItem
          value={showReport[report.stateIctPolicy] || ""}
          label="Existence of a state ICT Policy"
        />
        <TextViewItem
          value={result.officialMailUse || ""}
          label="Adherence to use of official email by civil servants in the state"
        />
        <Label className="col-form-label-lg mt-3">
          Internet availability and speed
        </Label>
        <TextViewItem
          value={result.officialInternetProvision || ""}
          label="Is internet free and readily available for cilvil servants in the state secretariat?"
        />
        <TextViewItem
          value={result.videoConferenceUse || ""}
          label="Level of use of video conferencing platforms for meetings"
        />
        <TextViewItem
          value={result.intranetUse || ""}
          label="Use of intranet within government institutions"
        />
        <Label className="col-form-label-lg mt-3">
          Level of ICT reforms/advancement in the following sectors
        </Label>
        <TextViewItem
          value={result.ict4Learning || ""}
          label="Education (use of magic board in at least 50% of state-owned primary & secondary schools"
        />
        <TextViewItem
          value={result.ict4HealthRecords || ""}
          label="Health (use of an electronic medical records (EMRs) in at least 50% of state owned hospitals)"
        />
        <TextViewItem
          value={showReport[report.presenceofTelemedicine] || ""}
          label="Use of telemedicine services within state owned hospitals"
        />
        <TextViewItem
          value={result.digitizedLandRecords || ""}
          label="Land Administration (digitization of land administration process)"
        />
        <TextViewItem
          value={result.digitizedJudiciary || ""}
          label="Judiciary (digitization of court proceedings including awaiting trial cases)"
        />
        <TextViewItem
          value={result.digitizedAgric || ""}
          label="Agriculture (use of technology to upscale agricultural output in state)"
        />
        <TextViewItem
          value={result.ecommerceIncentives || ""}
          label="Industry, Trade and Commerce (sponsored use of eCommerce platforms in state)"
        />
        <Label className="col-form-label-lg mt-3">
          Deployment of computer systems in state secretariat
        </Label>
        <TextViewItem
          value={result.stateIctSystemDeploment || ""}
          label="Level of deployment"
        />
        <TextViewItem
          value={result.stateITDepartment || ""}
          label="Is there internal capacity to maintain the computer systems within the state civil service? "
        />
        <TextViewItem
          value={result.digitizedFiling || ""}
          label="Use of an electronic filing system in the state secretariat?"
        />
        <TextViewItem
          value={result.cyberSecurityInfra || ""}
          label="Existence of a cybersecurity infrastructure within the states ICT infrastructure"
        />
        <Label className="col-form-label-lg mt-3">Startup Ecosystem</Label>
        <TextViewItem
          value={result.startupDb || ""}
          label="Existence of database of registered start ups in state"
        />
        <TextViewItem
          value={result.startupInvestmentVolume || ""}
          label="Volume of Local or Foreign Direct Investment attracted to state courtesy start ups"
        />
        <TextViewItem
          value={result.startUpDirectJobs || ""}
          label="How many direct jobs were created courtesy start ups in the state"
        />
        <Label className="col-form-label-lg mt-3">
          Status of State Official Website
        </Label>
        <TextViewItem
          value={result.stateWebsiteFunctionality || ""}
          label="Functionality "
        />
        <TextViewItem
          value={result.stateWebsiteUI || ""}
          label="Interface and user friendliness"
        />
        <TextViewItem
          value={result.stateWebsiteSecurity || ""}
          label="Security and safety features"
        />
        <Label className="col-form-label-lg mt-3">Staff ICT proficiency</Label>
        <TextViewItem
          value={result.iCTUpskill || ""}
          label="Are there opportunities for civil servants in the state to upskill with regards to ICT (evidence of courses and training funded by state)"
        />
        <TextViewItem
          value={result.certifiedITPersonnel || ""}
          label="Availability of ICT certified personnel in the state civil service"
        />{" "}
      </Widget>
    );
  };

  if (props.saveLoading) {
    return <Loader />;
  }

  return renderForm();
};

export default withRouter(ViewReport);
