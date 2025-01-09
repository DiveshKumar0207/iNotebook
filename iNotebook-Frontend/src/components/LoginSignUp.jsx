import { useState, useContext } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Checkbox,
} from "@material-tailwind/react";

import AuthContext from "../context/auth/AuthContext";
import { showToast } from "../utils/ToastHandler";

// ====== login validation schema==========
const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

// ======= Signup validation schema===========
const signupValidationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be of 3 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be of 8 characters")
    .matches(/[a-z]/, "Password must include at least one lowercase letter")
    .matches(/[A-Z]/, "Password must include at least one uppercase letter")
    .matches(/\d/, "Password must include at least one digit")
    .matches(
      /[!@#$%^&*()_+-]/,
      "Include at least 1 special character !@#$%^&*()_+-",
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("ConfirmPassword is required"),
});

// =========================================== main function to export ==========================================
// ==============================================================================================================
export default function LoginSignupForm() {
  const authContext = useContext(AuthContext);
  const { userLoginFunc, userSignUpFunc } = authContext;

  // -- type => if its login or signup // to switch card-panels --
  const [type, setType] = useState("login");
  // ================== login =======
  const loginInitialValues = {
    email: "",
    password: "",
  };
  //
  const loginHandleSubmit = async (values, { setSubmitting }) => {
    // Handle login form submission logic here
    const response = await userLoginFunc(values);

    // Check if the response indicates success
    if (response.success) {
      showToast("Welcome user!", "success");
    } else {
      // If the response has an error message or failed flag
      showToast("Login failed", "error");
    }
    setSubmitting(false);
  };

  // ================== signup ======
  const signupInitialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  //
  const signupHandleSubmit = async (values, { setSubmitting }) => {
    // Handle login form submission logic here
    const response = await userSignUpFunc(values);

    // Check if the response indicates success
    if (response.success) {
      showToast(
        "Welcome user! Your account has been successfully created.",
        "success",
      );
    } else {
      // If the response has an error message or failed flag
      showToast("Account creation failed", "error");
    }
    setSubmitting(false);
  };

  return (
    <div
      style={{ minHeight: "calc(100vh - 71.5px)" }}
      className=" flex items-center justify-center"
    >
      {/* alerting purpose */}

      <Card className="w-full max-w-[24rem]">
        <CardHeader
          color="gray"
          floated={false}
          shadow={false}
          className="m-0 grid place-items-center px-4 py-12 text-center"
        >
          <Typography variant="h5" color="white">
            iNotebook
          </Typography>
        </CardHeader>

        <CardBody>
          <Tabs value={type} className="overflow-visible">
            <TabsHeader className="relative z-0 ">
              <Tab value="login" onClick={() => setType("login")}>
                Log in
              </Tab>
              <Tab value="signup" onClick={() => setType("signup")}>
                Sign up
              </Tab>
            </TabsHeader>

            <TabsBody
              className="!overflow-x-hidden "
              animate={{
                initial: {
                  x: type === "login" ? 400 : -400,
                },
                mount: {
                  x: 0,
                },
                unmount: {
                  x: type === "login" ? 400 : -400,
                },
              }}
            >
              {/*========================================= LOGIN ========================================== */}

              <TabPanel value="login" className="p-0">
                <Formik
                  initialValues={loginInitialValues}
                  validationSchema={loginValidationSchema}
                  onSubmit={loginHandleSubmit}
                >
                  {({ handleSubmit, errors }) => (
                    <form
                      onSubmit={handleSubmit}
                      className="mt-12 flex flex-col"
                      method="post"
                    >
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 font-medium"
                        >
                          Your Email
                        </Typography>
                        <Field
                          as={Input}
                          type="email"
                          name="email"
                          placeholder="name@mail.com"
                          className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                          autoComplete="username"
                        />
                        <div className=" flex h-6 items-center justify-end pr-2 text-sm text-errorColor-light">
                          <ErrorMessage name="email" component="div" />
                        </div>
                      </div>

                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 font-medium "
                        >
                          Password
                        </Typography>

                        <Field
                          as={Input}
                          type="password"
                          name="password"
                          placeholder="# # # # # # # # # # # "
                          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                          autoComplete="current-password"
                        />
                        <div className=" flex h-6 items-center justify-end pr-2 text-sm text-errorColor-light">
                          <ErrorMessage name="password" component="div" />
                        </div>
                      </div>

                      <div>
                        <Checkbox
                          label={
                            <div>
                              <Typography
                                color="blue-gray"
                                className="font-medium"
                              >
                                Remember Me
                              </Typography>
                              <Typography
                                variant="small"
                                color="gray"
                                className="font-normal"
                              >
                                You&apos;ll be able to login without password
                                for 1 week.
                              </Typography>
                            </div>
                          }
                          containerProps={{
                            className: "-mt-5",
                          }}
                        />
                      </div>

                      <Button
                        size="lg"
                        className="mt-6"
                        type="submit"
                        disabled={Object.keys(errors).length > 0}
                      >
                        Log in
                      </Button>
                    </form>
                  )}
                </Formik>
              </TabPanel>

              {/*========================================= SIGNUP ========================================== */}
              <TabPanel value="signup" className="p-0">
                <Formik
                  initialValues={signupInitialValues}
                  validationSchema={signupValidationSchema}
                  onSubmit={signupHandleSubmit}
                >
                  {({ handleSubmit, errors }) => (
                    <form
                      onSubmit={handleSubmit}
                      className="mt-12 flex flex-col"
                      method="post"
                    >
                      <div className="mb-2">
                        <Field
                          as={Input}
                          name="name"
                          type="text"
                          size="md"
                          label="Your Name"
                        />
                        <div className=" flex h-6 items-center justify-end pr-2 text-sm text-errorColor-light">
                          <ErrorMessage name="name" component="div" />
                        </div>
                      </div>

                      <div className="mb-2">
                        <Field
                          as={Input}
                          name="email"
                          type="email"
                          size="md"
                          label="name@mail.com"
                          autoComplete="username"
                        />
                        <div className=" flex h-6 items-center justify-end pr-2 text-sm text-errorColor-light">
                          <ErrorMessage name="email" component="div" />
                        </div>
                      </div>

                      <div className="mb-2">
                        <Field
                          as={Input}
                          name="password"
                          type="password"
                          size="md"
                          label="Enter password"
                          autoComplete="new-password"
                        />
                        <div className=" flex h-6 items-center justify-end pr-2 text-sm text-errorColor-light">
                          <ErrorMessage name="password" component="div" />
                        </div>
                      </div>

                      <div>
                        <Field
                          as={Input}
                          name="confirmPassword"
                          type="password"
                          size="md"
                          label="Enter confirm password"
                          autoComplete="new-password"
                        />
                        <div className=" flex h-6 items-center justify-end pr-2 text-sm text-errorColor-light">
                          <ErrorMessage
                            name="confirmPassword"
                            component="div"
                          />
                        </div>
                      </div>

                      <div className="mb-2 mt-0 ">
                        <Checkbox
                          label={
                            <Typography
                              variant="small"
                              color="gray"
                              className="flex items-center font-normal"
                            >
                              I agree the
                              <a
                                href="#"
                                className="font-medium text-o-blue-500 transition-colors hover:underline"
                              >
                                &nbsp;Terms and Conditions
                              </a>
                            </Typography>
                          }
                          ripple={true}
                          containerProps={{ className: "-ml-2.5" }}
                        />
                      </div>

                      <Button
                        size="lg"
                        className="mt-2"
                        type="submit"
                        disabled={Object.keys(errors).length > 0}
                      >
                        Sign up
                      </Button>
                    </form>
                  )}
                </Formik>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
