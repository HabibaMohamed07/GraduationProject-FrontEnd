import * as React from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel";
import IconButton, { IconButtonProps } from "@mui/joy/IconButton";
import { Link,Navigate,useNavigate   } from 'react-router-dom';
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import GoogleIcon from "../SignIn/GoogleIcon.tsx";
import FormPng from "../Assets/Robot-Hand.jpg";
import Robot from "../Assets/Robot.png";
import Radio from '@mui/joy/Radio';
import Chip from '@mui/joy/Chip';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import RadioGroup from '@mui/joy/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Stepper from "@mui/joy/Stepper";
import Step from "@mui/joy/Step";
import StepButton from "@mui/joy/StepButton";
import StepIndicator from "@mui/joy/StepIndicator";
import Check from "@mui/icons-material/Check";
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import List from '@mui/joy/List';
import { Grid } from "@mui/material";
import './Signup.css';
import Navbar from "../LandingPage/navbar/Navbar.js";
import { Maximize } from "@mui/icons-material";
import axios from "axios";
import { url } from "../config.js";
interface FormElements extends HTMLFormControlsCollection {
  //step 1
  email: HTMLInputElement;
  name: HTMLInputElement;
  password: HTMLInputElement;
  Age: HTMLInputElement;
  PhoneNumber: HTMLInputElement;
  Gender: HTMLInputElement;
 
  //Step2
 
  //Question 1 of 3
  IsPatientWork:HTMLInputElement;
  Job:HTMLInputElement;
  Heart:HTMLInputElement;
  Lung:HTMLInputElement;
  Kidney:HTMLInputElement;
  AutoImmune:HTMLInputElement;

  //Question 2 of 3
  IsPatientSurgery:HTMLInputElement;
  Surgery:HTMLInputElement;
  Accident:HTMLInputElement;
  Medications:HTMLInputElement;
  MedicationsDetails:HTMLInputElement;
  Smoke:HTMLInputElement;
  Alcohol:HTMLInputElement;

//   //Question 3 of 3 
  WalkwithoutAssistance:HTMLInputElement;
  UnderstandingLang:HTMLInputElement;
  Graspobject:HTMLInputElement;
  TurnHead:HTMLInputElement;
  patientstruggle:HTMLSelectElement;
   
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}


const steps = ["Personal Information", "Patient's History", "Subscription"];
export default function JoySignInSideTemplate() {
  const navigate=useNavigate();
    const [value, setValue] = React.useState('female');
    const [data, setData] = React.useState({
      email:'',
      name:'',
      password:'',
      age:0,
      phoneNumber:'',
      gender:'',
      patientHistory:''
    });
    function  handlesubmit()
{
  
 
    let posturl=url+"RegisterAsync";
    console.log("data to be created: ", data);
    axios.post(posturl,data)
    .then(function(response)
    {
      console.log(response)
      console.log("data to be created: ", data);
      navigate('/Signin');
  })

}
    const [options, setOptions] = React.useState({
        IsPatientWork:false,
        IsPatientSurgery:false,
        heart: 'yes',
        lung: 'yes',
        kdiney:'yes',
        autoimmune:'yes',
        accident:'yes',
        medications:'yes',
        smoke:'yes',
        alcohol:'yes',
        able_to_walk:'yes',
        understand_lang:'yes',
        grasp_objects:'yes',
        turn_head:'yes',
        patientstruggle:'Left',
       
      
    });

    const handleOptionChange = (setName, value) => {
        setOptions(prevOptions => ({
            ...prevOptions,
            [setName]: value
        }));
    };

   
  const [activeStep, setActiveStep] = React.useState(0); // Initialize activeStep to 0
  const totalSteps = steps.length;
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [paymentIndex,setPaymentIndex]=React.useState(0);
  const handlePayment=()=>{
    setPaymentIndex((prevPayment)=>
    prevPayment+1
    );

  }
  const handleWithDrawPayment=()=>{
    setPaymentIndex((prevPayment)=>
    prevPayment-1);
  }
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const handleNext = () => {
    if(activeStep===0 || questionIndex===2){
    setActiveStep((prevActiveStep) =>
      Math.min(prevActiveStep + 1, totalSteps - 1)
    );
    }

    if (activeStep === 1 && questionIndex < 3) {
      setQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };


  const handleBack = () => {
    if(activeStep===1 &&questionIndex===0 ){
    setActiveStep((prevActiveStep) =>
      Math.min(prevActiveStep - 1, totalSteps + 1)
    );
    }
    if (activeStep === 1 && questionIndex > 0) {
      setQuestionIndex((prevIndex) => prevIndex - 1);
    }
    if(activeStep===2)
    {
        setActiveStep((prevActiveStep)=>
        Math.min(prevActiveStep-1,totalSteps+1))
        setQuestionIndex((prevIndex)=>prevIndex-1);
    }
  };
  return (
    
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": {
            "--Collapsed-breakpoint": "769px", // form will stretch when viewport is below `769px`
            "--Cover-width": "50vw", // must be `vw` only
            "--Form-maxWidth": "800px",
            "--Transition-duration": "0.4s", // set to `none` to disable transition
          },
        }}
      />
      
      <Box
        sx={(theme) => ({
          width:
            "clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)",
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255 255 255 / 0.2)",
          [theme.getColorSchemeSelector("dark")]: {
            background: "rgb(4,12,24)",
          },
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            width:
              "clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)",
            maxWidth: "100%",
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: "flex",
              alignItems: "left",
              justifyContent: "space-between",
            }}
          >
           
            {/* <ColorSchemeToggle /> */}
          </Box>
          <Box
            component="main"
            sx={{
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
              [`& .${formLabelClasses.asterisk}`]: {
                visibility: "hidden",
              },
            }}
          >
            <Stack gap={4} sx={{ mb: 2 }}>
              <Stack gap={1}>
                <Typography component="h1" level="h3">
                  Sign up
                </Typography>
                <Typography level="body-sm">
                  Already have an account?
                  <Link to="/Signin" style={{textDecoration:"none"}}>
                    Sign in!
                  </Link>
                </Typography>
              </Stack>
            </Stack>
            <Divider
              sx={(theme) => ({
                [theme.getColorSchemeSelector("light")]: {
                  color: { xs: "#FFF", md: "text.tertiary" },
                  "--Divider-lineColor": {
                    xs: "#FFF",
                    md: "var(--joy-palette-divider)",
                  },
                },
              })}
            >
              or
            </Divider>
            <Stack gap={4} sx={{ mt: 2 }}>
            {activeStep==0 &&(
              <form
                onSubmit={(event: React.FormEvent<SignInFormElement>) => {
                  event.preventDefault();
                  const formElements = event.currentTarget.elements;
               
                  setData((prevData) => ({
                    ...prevData,
                    email: formElements.email.value,
                    name: formElements.name.value.trim().replace(/\s+/g, ''),
                    password: formElements.password.value,
                    age: formElements.Age.value,
                    phoneNumber: formElements.PhoneNumber.value,
                    gender: formElements.Gender.value
                  }));
                  alert(JSON.stringify(data, null, 2));
                  handleNext();
                }}
              >
                <FormControl required>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" name="email" />
                </FormControl>
                <FormControl required>
                  <FormLabel>Name</FormLabel>
                  <Input type="text" name="name" />
                </FormControl>
                <FormControl required>
                  <FormLabel>Password</FormLabel>
                  <Input type="password"  name="password"  />
                </FormControl>
                <FormControl required>
                  <FormLabel>Age</FormLabel>
                  <Input type="number"  name="Age"  />
                </FormControl>
                <FormControl required>
                  <FormLabel>Phone Number</FormLabel>
                  <Input type="number" name="PhoneNumber" />
                </FormControl>

                <FormControl required>
                <FormLabel>Gender</FormLabel>
                <RadioGroup
                    defaultValue="female"
                    name="Gender"
                    value={value}
                    onChange={handleChange}
                    sx={{ my: 1 }}
                >
                    <Radio value="female" label="Female" />
                    <Radio value="male" label="Male" />
                   
                </RadioGroup>
                </FormControl>
                
            
            
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  ></Box>
                  <Button type="submit" fullWidth>
                    Sign up
                  </Button>
                  </form>
               )}

               {activeStep===1 &&(
                <form
               onSubmit={(event: React.FormEvent<SignInFormElement>) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;
    
    // let data = { ...data }; // Assuming initialData holds other fields

    if (questionIndex === 0) {
      const medicaldata1 = {
        IsPatientWork: formElements.IsPatientWork.checked?formElements.Job.value:'No',
        Heart: formElements.Heart.value||"yes",
        Kidney: formElements.Kidney.value||"yes",       
        Lung: formElements.Lung.value||"yes",
        AutoImmune: formElements.AutoImmune.value||"yes",
      };
     

      data.patientHistory += Object.values(medicaldata1).join('@');
    } else if (questionIndex === 1) {
      const medicaldata2 = {
        IsPatientSurgery: formElements.IsPatientSurgery.checked?formElements.Surgery.value:'No',
        Accident: formElements.Accident.value||"yes",
        // Medications: formElements.Medications.value||"yes",
        MedicationsDetails: formElements.MedicationsDetails.value||"no medications",
        Smoke: formElements.Smoke.value||"yes",
        Alcohol: formElements.Alcohol.value||"yes",
      };
     
      data.patientHistory += '@' + Object.values(medicaldata2).join('@');
    } else if (questionIndex === 2) {
      const medicaldata3 = {
        WalkWithoutAssitance: formElements.WalkwithoutAssistance.value||"yes",
        UnderstandingLang: formElements.UnderstandingLang.value||"yes",
        Graspobject: formElements.Graspobject.value||"yes",
        TurnHead: formElements.TurnHead.value||"yes",
        patientstrugglewith: formElements.patientstruggle.length > 0 ?  formElements.patientstruggle[0].innerHTML :"Left",
      };
      data.patientHistory += '@' + Object.values(medicaldata3).join('@');
    }

    // alert(JSON.stringify(data, null, 2));
    handleNext();
  }}

              >
                   {questionIndex==0&&(
                   <>
                        <FormControl>
                        <FormLabel>
                        Does the patient works?
                        </FormLabel>
                        <div>
                        <Checkbox checked={options.IsPatientWork}
                            onChange={(event)=>handleOptionChange('IsPatientWork',event.target.checked)} size="sm" name="IsPatientWork" />
                        <span>  </span>
                        <input type="text" placeholder="Enter Patient Job" name='Job' disabled={!options.IsPatientWork} style={{background:options.IsPatientWork?'black':'grey',color:options.IsPatientWork?'white':'grey'}}/>
                        </div>
                        </FormControl>

                       
                        <FormControl required>
                        <FormLabel>Does the patient have any Heart Disease?</FormLabel>
                        <RadioGroup
                            defaultValue="yes"
                            name="Heart"
                            value={options.heart}
                            onChange={(event)=>handleOptionChange('heart',event.target.value)}
                            sx={{ my: 1 }}
                        >
                            <Box sx={{ display: 'flex', gap: 2 }}>
                            <Radio value="yes" label="Yes" />
                            <Radio value="no" label="No" />
                            </Box>
                        </RadioGroup>
                        </FormControl>
                       
                        <FormControl required>
                        <FormLabel>Does the patient have any Lung Disease?</FormLabel>
                        <RadioGroup
                            defaultValue="yes"
                            name="Lung"
                            value={options.lung}
                            onChange={(event)=>handleOptionChange('lung',event.target.value)}
                            sx={{ my: 1 }}
                        >
                            <Box sx={{ display: 'flex', gap: 2 }}>
                            <Radio value="yes" label="Yes" />
                            <Radio value="no" label="No" />
                            </Box>
                        </RadioGroup>
                        </FormControl>
                       
                        <FormControl required>
                        <FormLabel>Does the patient have any Kidney Disease?</FormLabel>
                        <RadioGroup
                            defaultValue="yes"
                            name="Kidney"
                            value={options.kdiney}
                            onChange={(event)=>handleOptionChange( "kdiney", event.target.value) }
                            sx={{ my: 1 }}
                        >
                            <Box sx={{ display: 'flex', gap: 2 }}>
                            <Radio value="yes" label="Yes" />
                            <Radio value="no" label="No" />
                            </Box>
                        </RadioGroup>
                        </FormControl>
                       
                        <FormControl required>
                        <FormLabel>Does the patient have any AutoImmune Disease?</FormLabel>
                        <RadioGroup
                            defaultValue="yes"
                            name="AutoImmune"
                            value={options.autoimmune}
                            onChange={(event)=>handleOptionChange('autoimmune',event.target.value )}
                            sx={{ my: 1 }}
                        >
                            <Box sx={{ display: 'flex', gap: 2 }}>
                            <Radio value="yes" label="Yes" />
                            <Radio value="no" label="No" />
                            </Box>
                        </RadioGroup>
                        </FormControl>
                

               
                  </>
                   )
               

                   }

            {questionIndex==1&&(
                   <>
                   <FormControl>
                   <FormLabel>
                   Did the patient do any previous surgery?        
                   </FormLabel>
                   <div>
                   <Checkbox size="sm"  checked={options.IsPatientSurgery}
                  
                            onChange={(event)=>handleOptionChange('IsPatientSurgery',event.target.checked)} name="IsPatientSurgery" />
                   <span>  </span>
                   <input type="text" placeholder="Surgery Details" name='Surgery' disabled={!options.IsPatientSurgery} style={{background:options.IsPatientSurgery?'black':'grey',color:options.IsPatientSurgery?'white':'grey'}}/>
                   </div>
                   </FormControl>

                  
                   <FormControl required>
                   <FormLabel>Did the patient have a previous accident? </FormLabel>
                   <RadioGroup
                       defaultValue="yes"
                       name="Accident"
                       value={options.accident}
                       onChange={(event)=>handleOptionChange('accident',event.target.value)}
                       sx={{ my: 1 }}
                   >
                       <Box sx={{ display: 'flex', gap: 2 }}>
                       <Radio value="yes" label="Yes" />
                       <Radio value="no" label="No" />
                       </Box>
                   </RadioGroup>
                   </FormControl>
                  
                   <FormControl required>
                   <FormLabel>Does the patient take any medications?</FormLabel>
                   <RadioGroup
                       defaultValue="yes"
                       name="Medications"
                       value={options.medications}
                       onChange={(event)=>handleOptionChange('medications',event.target.value)}
                       sx={{ my: 1 }}
                   >
                       <Box sx={{ display: 'flex', gap: 2 }}>
                       <Radio value="yes" label="Yes" />
                       <Radio value="no" label="No" />
                       </Box>
                   </RadioGroup>

                   </FormControl>
                    If yes,
                    <input type="text" placeholder="Please list the medications patient is currently taking "name="MedicationsDetails"></input>
                   <FormControl required>
                   <FormLabel>Does the patient smoke?</FormLabel>
                   <RadioGroup
                       defaultValue="yes"
                       name="Smoke"
                       value={options.smoke}
                       onChange={(event)=>handleOptionChange( "smoke", event.target.value) }
                       sx={{ my: 1 }}
                   >
                       <Box sx={{ display: 'flex', gap: 2 }}>
                       <Radio value="yes" label="Yes" />
                       <Radio value="no" label="No" />
                       </Box>
                   </RadioGroup>
                   </FormControl>
                  
                   <FormControl required>
                   <FormLabel>Does the patient drink alcohol?</FormLabel>
                   <RadioGroup
                       defaultValue="yes"
                       name="Alcohol"
                       value={options.alcohol}
                       onChange={(event)=>handleOptionChange('alcohol',event.target.value )}
                       sx={{ my: 1 }}
                   >
                       <Box sx={{ display: 'flex', gap: 2 }}>
                       <Radio value="yes" label="Yes" />
                       <Radio value="no" label="No" />
                       </Box>
                   </RadioGroup>
                   </FormControl>
           
              
                  
                    
                  
             

             </>
              
              )

              }
            {questionIndex==2&&(
                   <>
                  

                  
                   <FormControl required>
                   <FormLabel>Is the patient able to walk without assistance? </FormLabel>
                   <RadioGroup
                       defaultValue="yes"
                       name="WalkwithoutAssistance"
                       value={options.able_to_walk}
                       onChange={(event)=>handleOptionChange('able_to_walk',event.target.value)}
                       sx={{ my: 1 }}
                   >
                       <Box sx={{ display: 'flex', gap: 2 }}>
                       <Radio value="yes" label="Yes" />
                       <Radio value="no" label="No" />
                       </Box>
                   </RadioGroup>
                   </FormControl>
                  
                   <FormControl required>
                   <FormLabel>Does the patient have any difficulty speaking or understanding language?</FormLabel>
                   <RadioGroup
                       defaultValue="yes"
                       name="UnderstandingLang"
                       value={options.understand_lang}
                       onChange={(event)=>handleOptionChange('understand_lang',event.target.value)}
                       sx={{ my: 1 }}
                   >
                       <Box sx={{ display: 'flex', gap: 2 }}>
                       <Radio value="yes" label="Yes" />
                       <Radio value="no" label="No" />
                       </Box>
                   </RadioGroup>
                   </FormControl>
                  
                   <FormControl required>
                   <FormLabel>Can the patient reach for and grasp objects easily?</FormLabel>
                   <RadioGroup
                       defaultValue="yes"
                       name="Graspobject"
                       value={options.grasp_objects}
                       onChange={(event)=>handleOptionChange( "grasp_objects", event.target.value) }
                       sx={{ my: 1 }}
                   >
                       <Box sx={{ display: 'flex', gap: 2 }}>
                       <Radio value="yes" label="Yes" />
                       <Radio value="no" label="No" />
                       </Box>
                   </RadioGroup>
                   </FormControl>
                  
                   <FormControl required>
                   <FormLabel>Does the patient have any problems turning their head or looking in different directions?</FormLabel>
                   <RadioGroup
                       defaultValue="yes"
                       name="TurnHead"
                       value={options.turn_head}
                       onChange={(event)=>handleOptionChange('turn_head',event.target.value )}
                       sx={{ my: 1 }}
                   >
                       <Box sx={{ display: 'flex', gap: 2 }}>
                       <Radio value="yes" label="Yes" />
                       <Radio value="no" label="No" />
                       </Box>
                   </RadioGroup>

                   </FormControl>
           
                   <FormControl required>
                   <FormLabel>Which part is the patient struggling with  </FormLabel>
                   
                   <Select defaultValue="Left"
                    name='patientstruggle'
                  
                    >
                        <Option value="Left">Left</Option>
                        <Option value="Right">Right</Option>
                        <Option value="Both">Both</Option>
                       
                   </Select>
                   </FormControl>
           


              
                    
                  
             

             </>
              
              )

              }
              
              <Button type="button" fullWidth onClick={handleBack}>
                   Back
                  </Button>
                
                        <Button type="submit"  fullWidth>
                   Next
                  </Button>
                    
                  
                </form>

               )}

               {activeStep==2&&(
                <>
                {paymentIndex==0&&(

<Box
sx={{
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
  gap: 2,
}}
>
<Card size="lg" variant="outlined">
  <Chip size="sm" variant="outlined" color="neutral">
    BASIC
  </Chip>
  <Typography level="h2">Professional</Typography>
  <Divider inset="none" />
  <List size="sm" sx={{ mx: 'calc(-1 * var(--ListItem-paddingX))' }}>
    <ListItem>
      <ListItemDecorator>
        <Check />
      </ListItemDecorator>
      Virtual Credit Cards
    </ListItem>
    <ListItem>
      <ListItemDecorator>
        <Check />
      </ListItemDecorator>
      Financial Analytics
    </ListItem>
    <ListItem>
      <ListItemDecorator>
        <Check />
      </ListItemDecorator>
      Checking Account
    </ListItem>
    <ListItem>
      <ListItemDecorator>
        <Check />
      </ListItemDecorator>
      API Integration
    </ListItem>
  </List>
  <Divider inset="none" />
  <CardActions>
    <Typography level="title-lg" sx={{ mr: 'auto' }}>
      3.990€{' '}
      <Typography fontSize="sm" textColor="text.tertiary">
        / month
      </Typography>
    </Typography>
    <Button
      variant="soft"
      color="neutral"
      endDecorator={<KeyboardArrowRight />}
      onClick={handlePayment}
      
    >
      Start now
    </Button>
  </CardActions>
</Card>
</Box>

                )}
                {paymentIndex==1&&(
                  
                 <Card
                 variant="outlined"
                 sx={{
                   maxHeight: 'max-content',
                   maxWidth: '100%',
                   mx: 'auto',
                   // to make the demo resizable
                   overflow: 'auto',
                   resize: 'horizontal',
                 }}
               >
                 <Typography level="title-lg" startDecorator={<InfoOutlined />}>
                   Add new card
                 </Typography>
                 <Divider inset="none" />
                 <CardContent
                   sx={{
                     display: 'grid',
                     gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
                     gap: 1.5,
                   }}
                 >
                   <FormControl sx={{ gridColumn: '1/-1' }}>
                     <FormLabel>Card number</FormLabel>
                     <Input  endDecorator={<CreditCardIcon />} />
                   </FormControl>
                   <FormControl>
                     <FormLabel>Expiry date</FormLabel>
                     <Input endDecorator={<CreditCardIcon />} />
                   </FormControl>
                   <FormControl>
                     <FormLabel>CVC/CVV</FormLabel>
                     <Input endDecorator={<InfoOutlined />} />
                   </FormControl>
                   <FormControl sx={{ gridColumn: '1/-1' }}>
                     <FormLabel>Card holder name</FormLabel>
                     <Input placeholder="Enter cardholder's full name" />
                   </FormControl>
                   <CardActions sx={{ gridColumn: '1/-1'
                  ,display:"grid" }}>
                    
                     <Button variant="solid" color="primary" onClick={handlesubmit}>
                       Add card
                     </Button>
                    
                    
                    <Button variant="solid" color="danger" onClick={handleWithDrawPayment}>
                       Cancel
                     </Button>
                   </CardActions>
                 </CardContent>
               </Card>
                )}

</>
               )

               }
                
              
                  <Stepper sx={{ width: "130%" }}>
                    {steps.map((step, index) => (
                      <Step
                        key={step}
                        indicator={
                          <StepIndicator
                            variant={activeStep <= index ? "soft" : "solid"}
                            color={activeStep < index ? "neutral" : "primary"}
                          >
                            {activeStep <= index ? index + 1 : <Check />}
                          </StepIndicator>
                        }
                        sx={{
                          "&::after": {
                            ...(activeStep > index &&
                              index !== totalSteps - 1 && {
                                bgcolor: "primary.solidBg",
                              }),
                          },
                        }}
                      >
                        <StepButton>{step}</StepButton>
                      </Step>
                    ))}
                  </Stepper>
                </Stack>
             
          </Box>
     
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: "118%",
          position: "absolute",
          zIndex: -1,
          right: 0,
          top: 104,
          bottom: 0,
          left: "clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))",

          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${FormPng})`,
          [theme.getColorSchemeSelector("dark")]: {
            backgroundImage: `url(${FormPng})`,
          },
        })}
      />
      {/* dev mode */}
      <div>
        {/* Next button */}
        {/* <button onClick={handleNext} disabled={activeStep === totalSteps - 1}>
          Next
        </button>
        <button onClick={handleBack} disabled={activeStep === 0}>
          Back
        </button> */}
      </div>
    </CssVarsProvider>
  );
}

