import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { ErrorMessage, Form, Formik } from "formik";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import * as yup from "yup";
import { Link } from "react-router-dom";
import {  useSignInMutation } from "../../store/service/endpoints/auth.endpoint";
import { Loader2 } from "lucide-react";
import AuthGuard from "../../components/guard/Auth.Guard";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SignInPage = () => {
  const [fun, data] = useSignInMutation();
  console.log(data);
  const nav = useNavigate();
  // console.log(data);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .required("Email is required!")
      .email("Invalid Email Format"),
    password: yup
      .string()
      .required("Password is required!")
      .min(8, "Password should contain at least 8 characters!"),
  });

  useEffect(() => {
    const item = localStorage.getItem("token_email");
    if(item){
      // localStorage.removeItem("token_email");
      nav("/home");
    }
  },[])

  
  const location = useLocation();
  // console.log(location.pathname)
  useEffect(() => {
    if (location.pathname === "/home") {
      const item = localStorage.getItem("token_email");
      // console.log(item);
      if (item) {
        nav("/home");
      } else {
        nav("/");
      }
    }
  }, [location, nav]);

  const handleSubmit = async (value,action) => {
    await fun(value);
    action.reset();
  };

  

  useEffect(() => {
    if(data?.isSuccess){
      nav("/home");
    }
  },[data])
  // console.log(data);
  return (
    <AuthGuard check={data?.isSuccess} tokenEmail={data?.data?.email}>
      <div className="w-3/5 mx-auto h-full flex justify-center items-center">
        <Card className="basis-2/4 shadow-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Sign In
            </CardTitle>
          </CardHeader>

          <CardContent>
            <Formik
              validateOnBlur={false}
              validateOnChange={false}
              validationSchema={validationSchema}
              initialValues={initialValues}
              onSubmit={handleSubmit}
            >
              {({ handleBlur, handleChange, values, isSubmitting }) => (
                <>
                  <Form className="flex flex-col gap-1">
                    <Label htmlFor="email" className="text-md">
                      Email Address
                    </Label>
                    <Input
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your email..."
                    />
                    <ErrorMessage
                      className="text-red-500 text-sm"
                      component={"p"}
                      name="email"
                    />

                    <Label htmlFor="password" className="text-md mt-4">
                      Password
                    </Label>
                    <Input
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={handleChange}
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter your password..."
                    />
                    <ErrorMessage
                      className="text-red-500 text-sm"
                      component={"p"}
                      name="password"
                    />

                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      className="w-full bg-blue-500 hover:bg-blue-600 active:scale-95 mt-5"
                    >
                      Sign In
                      {/* {console.log(isSubmitting)} */}
                      {isSubmitting && (
                        <Loader2 className="ml-2 h-4 w-4 animate-spin duration-1000" />
                      )}
                    </Button>
                  </Form>
                </>
              )}
            </Formik>
          </CardContent>
          <CardDescription className="text-center pb-7">
            If you don't have an account, please{" "}
            <Link to="sign_up" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </CardDescription>
        </Card>
      </div>
    </AuthGuard>
  );
};

export default SignInPage;
