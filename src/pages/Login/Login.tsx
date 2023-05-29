import React from "react";
import { Anchor, Button, Flex, TextInput } from "@mantine/core";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { LoginParams } from "../../interfaces/login";
import { useAppDispatch } from "../../Redux/store";
import { fetchLogin } from "../../Redux/Auth.slice";
import { Link, useNavigate } from "react-router-dom";

import styled from "styled-components";
const Login = () => {
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
    const LoginParams: LoginParams = {
      email: values.email,
      password: values.password,
    };
    try {
      const { token } = await dispatch(fetchLogin(LoginParams)).unwrap();
      if (token) window.localStorage.setItem("token", token);
      navigate("/shops/main");
    } catch (err: any) {
      console.log(err);
    }
  };
  return (
    <AuthPageWrapper align="center" justify="center">
      <AuthWrapper>
        <FormHeading>Login</FormHeading>
        <AuthForm onSubmit={handleSubmit(onSubmitHandler)}>
          <p>Данные для входа: admin@gmail.com admin</p>
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
          <Link to="/auth/sign-up">
            <Anchor>Doesn't have an account ? Register here</Anchor>
          </Link>
          <Button size="lg" type="submit">
            Login
          </Button>
        </AuthForm>
      </AuthWrapper>
    </AuthPageWrapper>
  );
};
export const AuthPageWrapper = styled(Flex)`
  width: 100vw;
  height: 90vh;
`;
export const AuthWrapper = styled.div`
  border-radius: 8px;
  border: 1px solid gray;
  max-width: 500px;
  padding: 20px 25px;
`;
export const FormHeading = styled.h1`
  text-align: center;
  margin: 0;
  margin-bottom: 40px;
`;
export const AuthForm = styled.form`
  font-size: 20px;
  display: flex;
  flex-direction: column;
  input {
    margin: 5px 0;
    padding: 10px 5px;
  }
  a {
    margin-top: 25px;
  }
`;
export default Login;
