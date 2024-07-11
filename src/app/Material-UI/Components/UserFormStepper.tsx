import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Chip, FormControlLabel, InputLabel, MenuItem, OutlinedInput, Radio, RadioGroup, TextField } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  DesignationOptions,
  jobLocationsOptions,
  jobTypeOptions,
  ExperienceLevelOptions,
  shiftTimingOptions,
  NoticePeriodDurationOptions,
  Locations
} from "@/app/common/UserFormData";
import { Theme, useTheme } from '@mui/material/styles';

const steps = ["Personal Details", "Job Details", "Job Prefferences"];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function UserFormStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [designation, setDesignation] = React.useState("");
  const [jobType, setJobType] = React.useState("");
  const [JobLocation, setJobLocation] = React.useState("");
  const [ExperienceLevel, setExperienceLevel] = React.useState("");
  const [shiftTiming, setShiftTiming] = React.useState("");
  const [ NoticePeriodDuration, setNoticePeriodDuration] = React.useState("");
  const [PrefferedLocations, setPrefferedLocations] = React.useState<string[]>([]);
  const [ PrefferedType, setPrefferedType] = React.useState<string[]>([]);
  

  const handleChange = (event: SelectChangeEvent) => {
    setDesignation(event.target.value as string);
    setJobType(event.target.value as string);
    setJobLocation(event.target.value as string);
    setExperienceLevel(event.target.value as string);
    setShiftTiming(event.target.value as string);
    setNoticePeriodDuration(event.target.value as string);
  };

  const theme = useTheme();

  const handlePrefferedLocationChange = (event: SelectChangeEvent<typeof PrefferedLocations>) => {
    const {
      target: { value },
    } = event;
    setPrefferedLocations(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleMultiChange = (event: SelectChangeEvent<typeof NoticePeriodDuration>) => {
    const {
      target: { value },
    } = event;
    setPrefferedLocations(
      typeof value === 'string' ? value.split(',') : value,
    );
    setPrefferedLocations(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleNext = () => {
    let newSkipped = skipped;
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const PersonalDetails = () => {
    return (
      <>
        <Box sx={{ display: "flex" }} className="mt-2">
          <Box sx={{ width: "50%" }} className="mx-1">
            <Typography>Employee name</Typography>
            <TextField
              id="name"
              style={{ width: "100%" }}
              placeholder="Enter Full Employee Name"
            />
          </Box>
          <Box sx={{ width: "50%" }} className="mx-1">
            <Typography>Username</Typography>
            <TextField
              id="username"
              style={{ width: "100%" }}
              placeholder="Enter User Name"
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex" }} className="mt-4">
          <Box sx={{ width: "50%" }} className="mx-1">
            <Typography>Email Address</Typography>
            <TextField
              id="email"
              style={{ width: "100%" }}
              placeholder="Enter Your Email Address"
            />
          </Box>
          <Box sx={{ width: "50%" }} className="mx-1">
            <Typography>Contact No</Typography>
            <TextField
              id="phone"
              style={{ width: "100%" }}
              placeholder="Enter Your Contact No"
            />
          </Box>
        </Box>
      </>
    );
  };

  const JobDetails = () => {
    return (
      <>
        <Box sx={{ display: "flex" }} className="mt-4">
          <Box sx={{ width: "50%" }} className="mx-1">
            <Typography>Designation</Typography>
            <Select
              labelId="designation"
              id="designation"
              value={designation}
              placeholder="Designation"
              onChange={handleChange}
              style={{ width: "100%" }}
            >
              {DesignationOptions.map((designation, index) => (
                <MenuItem key={index} value={designation.name}>
                  {designation.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box sx={{ width: "50%" }} className="mx-1">
            <Typography>Job Type</Typography>
            <Select
              labelId="jobType"
              id="jobType"
              value={jobType}
              placeholder="jobType"
              onChange={handleChange}
              style={{ width: "100%" }}
            >
              {jobTypeOptions.map((jobType, index) => (
                <MenuItem key={index} value={jobType.name}>
                  {jobType.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
        <Box sx={{ display: "flex" }} className="mt-4">
          <Box sx={{ width: "50%" }} className="mx-1">
            <Typography>Job location</Typography>
            <Select
              labelId="JobLocation"
              id="JobLocation"
              value={JobLocation}
              placeholder="Job location"
              onChange={handleChange}
              style={{ width: "100%" }}
            >
              {jobLocationsOptions.map((JobLocation, index) => (
                <MenuItem key={index} value={JobLocation.name}>
                  {JobLocation.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box sx={{ width: "50%" }} className="mx-1">
            <Typography>Job Type</Typography>
            <Select
              labelId="ExperienceLevel"
              id="ExperienceLevel"
              value={ExperienceLevel}
              placeholder="ExperienceLevel"
              onChange={handleChange}
              style={{ width: "100%" }}
            >
              {ExperienceLevelOptions.map((ExperienceLevel, index) => (
                <MenuItem key={index} value={ExperienceLevel.name}>
                  {ExperienceLevel.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
        <Box sx={{ display: "flex" }} className="mt-4">
          <Box sx={{ width: "25%" }} className="mx-1">
      <Typography>Income details (monthly)</Typography>
            <TextField
              id="salary"
              type="number"
              style={{ width: "100%" }}
              placeholder="Enter Your Salary ( Monthly )"
            />
      </Box>
      <Box sx={{ width: "35%" }} className="mx-1">
    <Typography>Date of Joining</Typography>
    <TextField
      id="joiningDate"
      type="date"
      InputLabelProps={{
        shrink: true,
      }}
      style={{ width: "100%" }}
      placeholder="Enter Date of Joining"
    />
  </Box>
  <Box sx={{ width: "40%" }} className="mx-1">
            <Typography>Job location</Typography>
            <Select
              labelId="shiftTiming"
              id="shiftTiming"
              value={shiftTiming}
              placeholder="Job location"
              onChange={handleChange}
              style={{ width: "100%" }}
            >
              {shiftTimingOptions.map((shiftTiming, index) => (
                <MenuItem key={index} value={shiftTiming.name}>
                  {shiftTiming.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
    </Box>
        <Box sx={{ display: "flex" }} className="mt-4">
          <Box sx={{ width: "50%" }} className="mx-1">
            <Typography>Notice period duration</Typography>
            <Select
              labelId="NoticePeriodDuration"
              id="NoticePeriodDuration"
              value={NoticePeriodDuration}
              placeholder="Notice period duration"
              onChange={handleChange}
              style={{ width: "100%" }}
            >
              {NoticePeriodDurationOptions.map((NoticePeriodDuration, index) => (
                <MenuItem key={index} value={NoticePeriodDuration.name}>
                  {NoticePeriodDuration.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box sx={{ width: "25%" }} className="mx-1">
            <Typography>Serving notice period</Typography>
             <RadioGroup
        row
        aria-labelledby="noticePeriod"
        name="noticePeriod"
        sx={{display: "flex", justifyContent:"space-evenly"}}
      >
        <FormControlLabel value={true} control={<Radio/>} label="Yes" />
        <FormControlLabel value={false} control={<Radio />} label="No" />
      </RadioGroup>
          </Box>
          <Box sx={{ width: "25%" }} className="mx-1">
            <Typography>Serving probation period</Typography>
             <RadioGroup
        row
        aria-labelledby="probationPeriod"
        name="probationPeriod"
        sx={{display: "flex", justifyContent:"space-evenly"}}
      >
        <FormControlLabel value={true} control={<Radio/>} label="Yes" />
        <FormControlLabel value={false} control={<Radio />} label="No" />
      </RadioGroup>
          </Box>
        </Box>
      </>
    );
  };

  const JobPrefferences = () => {
    return (
      <>
        <Box sx={{ display: "flex" }} className="mt-2">
          <Box sx={{ width: "50%" }} className="mx-1">
            <Typography>Preferred Job Types</Typography>
            <Select
              labelId="PrefferedLocations"
              id="PrefferedLocations"
              sx={{width: "100%"}}
              multiple
              value={PrefferedLocations}
              onChange={handleMultiChange}
              input={<OutlinedInput id="select-multiple-chip" label="Preferred Job Locations" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {Locations.map((value: any) => (
                    <Chip key={value.name} label={value.name} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {Locations.map((jobType) => (
                <MenuItem
                  key={jobType.name}
                  value={jobType.name}
                  style={getStyles(jobType.name, PrefferedLocations, theme)}
                >
                  {jobType.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box sx={{ width: "50%" }} className="mx-1">
            <Typography>Preferred Job Types</Typography>
            <Select
              labelId="PrefferedType"
              id="PrefferedType"
              sx={{width: "100%"}}
              multiple
              value={PrefferedType}
              onChange={handlePrefferedLocationChange}
              input={<OutlinedInput id="select-multiple-chip" label="Preferred Job Locations" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {Locations.map((value: any) => (
                    <Chip key={value.name} label={value.name} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {Locations.map((jobType) => (
                <MenuItem
                  key={jobType.name}
                  value={jobType.name}
                  style={getStyles(jobType.name, PrefferedLocations, theme)}
                >
                  {jobType.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
        <Box sx={{ display: "flex" }} className="mt-4">
          <Box sx={{ width: "50%" }} className="mx-1">
            <Typography>Email Address</Typography>
            <TextField
              id="email"
              style={{ width: "100%" }}
              placeholder="Enter Your Email Address"
            />
          </Box>
          <Box sx={{ width: "50%" }} className="mx-1">
            <Typography>Contact No</Typography>
            <TextField
              id="phone"
              style={{ width: "100%" }}
              placeholder="Enter Your Contact No"
            />
          </Box>
        </Box>
      </>
    );
  };
  

  return (
    <Box height="35rem" sx={{ width: "100%", border: "1px solid #1976d2", borderRadius: "20px", padding: "20px" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <Box height="30rem" sx={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
          <Box height="80%" sx={{ display: "flex", justifyContent: "center", alignItems: "center",}}>
          <Typography variant="h5" sx={{color:"#1976d2"}}>
            All data has been submitted.
          </Typography>
          </Box>
          <Box height="20%" sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </Box>
      ) : (
        <Box height="90%" sx={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
          <Typography sx={{ mt: 2, mb: 1 }}>
            {activeStep === 0 ? (
              <PersonalDetails />
            ) : activeStep === 1 ? (
              <JobDetails />
            ) : activeStep === 2 ? (
              <JobPrefferences />
            ) : null}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}