"use client";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { FormEvent, useContext } from "react";
import { AuthContext } from "@/Providers/AuthProviders";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";

const metadata = {
  title: "SignUp- Mitnog",
  description: "A Multi-Vendor e-Commerce Platform ",
};

interface UserProps {
  user: User;
}

const SignUp: React.FC = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useRouter();

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const password = form.password.value;

    await createUser(email, password)
      .then((result) => {
        const createdUser: User = result.user;
        console.log(createdUser);

        const saveUserToMongoDb = {
          firstName: createdUser?.firstName,
          lastName: createdUser?.lastName,
          email: createdUser.email,
        };

        fetch("https://mitnog-server.vercel.app/users", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(saveUserToMongoDb),
        });

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully Sign-Up to Mitnog",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate.push("/");
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: "Something Wrong",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <Container className="h-screen" component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {/* noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} */}
        <Box component="form" onSubmit={handleSignUp}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            className="bg-blue-800"
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default SignUp;
