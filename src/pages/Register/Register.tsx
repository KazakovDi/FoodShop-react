import React from "react";
import { Anchor, Button, Flex, TextInput } from "@mantine/core";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { useAppDispatch } from "../../Redux/store";
import { fetchRegister } from "../../Redux/Auth.slice";
import { Link, useNavigate } from "react-router-dom";
import {
  AuthPageWrapper,
  AuthWrapper,
  FormHeading,
  AuthForm,
} from "../Login/Login";
const Register = () => {
  const {
    formState: { errors },
    setError,
    reset,
    control,
    handleSubmit,
  } = useForm({
    mode: "onSubmit",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSubmitHandler = async (values: FieldValues) => {
    const registerValues = {
      login: values.login,
      email: values.email,
      password: values.password,
    };
    try {
      const { token } = await dispatch(fetchRegister(registerValues)).unwrap();
      if (token) window.localStorage.setItem("token", token);
      navigate("/shops/main");
    } catch (err: any) {
      console.log(err);
    }
  };
  return (
    <AuthPageWrapper align="center" justify="center">
      <AuthWrapper>
        <FormHeading>Register</FormHeading>
        <AuthForm onSubmit={handleSubmit(onSubmitHandler)}>
          <Controller
            name={"login"}
            control={control}
            render={({ field }) => (
              <TextInput size="lg" placeholder="Login" {...field} />
            )}
          />
          <Controller
            name={"email"}
            control={control}
            render={({ field }) => (
              <TextInput size="lg" placeholder="Email" {...field} />
            )}
          />
          <Controller
            name={"password"}
            control={control}
            render={({ field }) => (
              <TextInput size="lg" placeholder="Password" {...field} />
            )}
          />
          <Link to="/auth/sign-in">
            <Anchor>Already have an account ? Login here</Anchor>
          </Link>
          <Button size="lg" type="submit">
            Register
          </Button>
        </AuthForm>
      </AuthWrapper>
    </AuthPageWrapper>
  );
};
export default Register;
