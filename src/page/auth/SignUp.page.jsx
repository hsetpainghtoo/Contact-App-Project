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
import {useSignUpMutation} from "../../store/service/endpoints/auth.endpoint.js"
import {Loader2} from "lucide-react"


const SignUpPage = () => {

  const [fun,data] = useSignUpMutation();
  console.log(data);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Name is required!")
      .min(2, "Your name should be longer than 2 letters"),
    email: yup
      .string()
      .required("Email is required!")
      .email("Invalid Email Format"),
    password: yup
      .string()
      .required("Password is required!")
      .min(8, "Password should contain at least 8 characters!"),
    confirm_password: yup
      .string()
      .required("Password Confirm is required!")
      .oneOf(
        [yup.ref("password"), null],
        "Confirm Password should be match with the previous password!"
      ),
      //.oneOf() is use to confirm that confirm_password is matched with previous password
  });

  const handleSubmit =async (value) => {
    await fun(value);
  };
  return (
    <div className="w-3/5 mx-auto h-full flex justify-center items-center">
      <Card className="basis-2/4 shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Sign Up
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
                  <Label htmlFor="name" className="text-md">
                    Name
                  </Label>
                  <Input
                    onBlur={handleBlur}
                    value={values.name}
                    onChange={handleChange}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter your name..."
                  />
                  <ErrorMessage
                    className="text-red-500 text-sm"
                    component={"p"}
                    name="name"
                  />

                  <Label htmlFor="email" className="text-md mt-4">
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


                  <Label htmlFor="confirm_password" className="text-md mt-4">
                    Confirm Password
                  </Label>
                  <Input
                    onBlur={handleBlur}
                    value={values.confirm_password}
                    onChange={handleChange}
                    type="password"
                    name="confirm_password"
                    id="confirm_password"
                    placeholder="Enter your confirm password..."
                  />
                  <ErrorMessage
                    className="text-red-500 text-sm"
                    component={"p"}
                    name="confirm_password"
                  />

                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 active:scale-95 mt-5"
                  >
                    Sign Up
                    {isSubmitting && <Loader2 className="ml-2 h-4 w-4 animate-spin duration-1000"/>}
                  </Button>
                </Form>
              </>
            )}
          </Formik>
        </CardContent>
        <CardDescription className="text-center pb-7">
          If you have an account, please{" "}
          <Link to="/" className="text-blue-500 hover:underline">Sign in</Link>
        </CardDescription>
      </Card>
    </div>
  );
};

export default SignUpPage;
