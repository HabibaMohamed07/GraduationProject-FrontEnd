import React, {useState,useEffect} from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel, { formLabelClasses } from '@mui/joy/FormLabel';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
// import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import GoogleIcon from './GoogleIcon.tsx';
import Mountain from '../Assets/Mountain.avif';
import Signup from '../SignUp/Signup.js';
import { Link , useNavigate} from 'react-router-dom';
import Navbar from '../LandingPage/navbar/Navbar.js';
import FormPng  from "../Assets/Robot-Hand.jpg";
import SignIn from '../Assets/SignIn.png';
import axios from 'axios';
import {jwtDecode}  from 'jwt-decode'
import {url} from '../config.js';
interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  persistent: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}


export default function JoySignInSideTemplate() {

  const navigate = useNavigate();
  const [logindata, setLoginData] = useState({
    email:'',
   
    password:'',
   
  });
  const handleNavigation = async (data) => {
   
  
    try {
      console.log(url + "LoginAsync");
      let poststring = url + "LoginAsync";
      const response = await axios.post(poststring, data);
  
      console.log(data);
      console.log(response.data.isSuccess);
  
      if (response.data.isSuccess) {
        var token = response.data.message;
        var user = jwtDecode(token);
        var role = user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  
        console.log(token);
        console.log(response.data);
  
        localStorage.setItem('userToken', token);
        navigate('/Dashboard');
      } else {
        alert("Wrong Email or Password");
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Handle error state or alert user about login failure
      alert("An error occurred during login. Please try again later.");
    }

  }
  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ':root': {
            '--Collapsed-breakpoint': '769px', // form will stretch when viewport is below `769px`
            '--Cover-width': '50vw', // must be `vw` only
            '--Form-maxWidth': '800px',
            '--Transition-duration': '0.4s', // set to `none` to disable transition
          },
        }}
      />
      
      <Box
        sx={(theme) => ({
          width:
            'clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)',
          transition: 'width var(--Transition-duration)',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255 255 255 / 0.2)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundColor: 'rgb(4,12,24)',
          },
        })}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100dvh',
            width:
              'clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)',
            maxWidth: '100%',
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: 'flex',
              alignItems: 'left',
              justifyContent: 'space-between',
            }}
          >
            
            {/* <ColorSchemeToggle /> */}
          </Box>
          <Box
            component="main"
            sx={{
              my: 'auto',
              py: 2,
              pb: 5,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: 400,
              maxWidth: '100%',
              mx: 'auto',
              borderRadius: 'sm',
              '& form': {
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              },
              [`& .${formLabelClasses.asterisk}`]: {
                visibility: 'hidden',
              },
            }}
          >
            <Stack gap={4} sx={{ mb: 2 }}>
              <Stack gap={1}>
                <Typography component="h1" level="h3">
                  Sign in
                </Typography>
                <Typography level="body-sm">
                  New to company?
                  <Link to="/Signup" style={{textDecoration:"none"}}>
                    Sign up!
                  </Link>
                </Typography>
              </Stack>
              <Button
                variant="soft"
                color="neutral"
                fullWidth
                startDecorator={<GoogleIcon />}
              >
                Continue with Google
              </Button>
            </Stack>
            <Divider
              sx={(theme) => ({
                [theme.getColorSchemeSelector('light')]: {
                  color: { xs: '#FFF', md: 'text.tertiary' },
                  '--Divider-lineColor': {
                    xs: '#FFF',
                    md: 'var(--joy-palette-divider)',
                  },
                },
              })}
            >
              or
            </Divider>
            <Stack gap={4} sx={{ mt: 2 }}>
              <form
                onSubmit={(event: React.FormEvent<SignInFormElement>) => {
                  event.preventDefault();
                  const formElements = event.currentTarget.elements;
                  const data={
                    email : formElements.email.value,
                    password: formElements.password.value
                  }
                  handleNavigation(data)

                }}
              >
                <FormControl required>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" name="email" />
                </FormControl>
                <FormControl required>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" name="password" />
                </FormControl>
                <Stack gap={4} sx={{ mt: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Checkbox size="sm" label="Remember me" name="persistent" />
                    
                  </Box>
                
                    <Button type="submit" fullWidth>
                    Sign in
                  </Button>
                  
                </Stack>
              </form>
            </Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              © MindMend {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: '100%',
          position: 'absolute',
          zIndex:-1,
          right: 0,
          top:104,
          bottom: 0,
          left: 'clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))',
        
          transition:
            'background-image var(--Transition-duration), left var(--Transition-duration) !important',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          backgroundColor: 'background.level1',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage:
          `url(${FormPng})`,
          [theme.getColorSchemeSelector('dark')]: {
            backgroundImage:
              `url(${SignIn})`,
          },
        })}
      />
    </CssVarsProvider>
  );
}