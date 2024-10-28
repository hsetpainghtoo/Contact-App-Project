import React from "react";
import * as yup from "yup";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { ErrorMessage, Form, Formik } from "formik";
import { Button } from "../../../components/ui/button";
import { Loader2 } from "lucide-react";
import { useCreateMutation, useUpdateMutation } from "../../../store/service/endpoints/contact.endpoint";
import { useEffect } from "react";
import { SheetClose } from "../../../components/ui/sheet";
import { useRef } from "react";

const FormTool = ({editData, handleClose}) => {
  console.log(editData)
  const CloseRef = useRef();
  const initialValues = {
    name: editData?.data?.name || "",
    email: editData?.data?.email || "",
    phone: editData?.data?.phone || "",
    address: editData?.data?.address || "",
  };

  const [fun, { data, isError, isLoading, isSuccess }] = useCreateMutation();
  const [updateFun, apiData] = useUpdateMutation();

  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Name is required!")
      .min(3, "Name must be longer than 3"),

    email: yup
      .string()
      .email("That should be email format")
      .required("Email is required!"),

    phone: yup
      .string()
      .min(9, "That should be valid phone number")
      .max(11, "That should be valid phone number")
      .required("Phone Number is required!"),

    address: yup.string().required("Address is required!"),
  });

  const handleSubmit = async (value, action) => {
    if(editData.edit){
      await updateFun({id: editData.data?.id ,...value});
    }else{
      await fun(value);
    }
    action.reset();
    CloseRef.current.click();
  };

  useEffect(() => {
    console.log("Create Data", data, isError, isLoading);
  }, [data, isError, isLoading]);

  return (
    <div className="h-full">
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ handleBlur, handleChange, values, isSubmitting }) => (
          <>
            <Form className="flex flex-col gap-1 h-full justify-between">
              <div className="space-y-5 mt-5">
                <div>
                  <Label htmlFor="name" className="text-md">
                    Name
                  </Label>
                  <Input
                    onBlur={handleBlur}
                    value={values.name}
                    onChange={handleChange}
                    type="name"
                    name="name"
                    id="name"
                    placeholder="Enter your name..."
                  />
                  <ErrorMessage
                    className="text-red-500 text-sm"
                    component={"p"}
                    name="name"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-md mt-4">
                    Email
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
                </div>

                <div>
                  <Label htmlFor="phone" className="text-md mt-4">
                    Phone Number
                  </Label>
                  <Input
                    onBlur={handleBlur}
                    value={values.phone}
                    onChange={handleChange}
                    type="phone"
                    name="phone"
                    id="phone"
                    placeholder="Enter your phone number..."
                  />
                  <ErrorMessage
                    className="text-red-500 text-sm"
                    component={"p"}
                    name="phone"
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="text-md mt-4">
                    Address
                  </Label>
                  <Input
                    onBlur={handleBlur}
                    value={values.address}
                    onChange={handleChange}
                    type="address"
                    name="address"
                    id="address"
                    placeholder="Enter your address..."
                  />
                  <ErrorMessage
                    className="text-red-500 text-sm"
                    component={"p"}
                    name="address"
                  />
                </div>
              </div>

              <div className="flex gap-3 pb-8">
                <SheetClose className="w-full mt-3">
                  <Button
                    onClick={handleClose}
                    disabled={isSubmitting}
                    type="button"
                    className="w-full bg-white hover:bg-white text-blue-500 border-2 border-blue-500 hover:shadow-md active:scale-95 mt-5"
                  >
                    Cancel
                    {/* {console.log(isSubmitting)} */}
                    {isSubmitting && (
                      <Loader2 className="ml-2 h-4 w-4 animate-spin duration-1000" />
                    )}
                  </Button>
                </SheetClose>

                <SheetClose ref={CloseRef} className="w-full mt-3">
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 active:scale-95 mt-5"
                  >
                    Create
                    {/* {console.log(isSubmitting)} */}
                    {isSubmitting && (
                      <Loader2 className="ml-2 h-4 w-4 animate-spin duration-1000" />
                    )}
                  </Button>
                </SheetClose>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default FormTool;
