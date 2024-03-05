"use client";
import {
  EmailOutlined,
  PersonOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

interface FormData {
  username?: string; // optional
  email: string;
  password: string;
}

const AuthForm = ({ type }: { type: "login" | "register" }) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues:
      type === "register"
        ? {
            username: "",
            email: "",
            password: "",
          }
        : {
            email: "",
            password: "",
          },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    let response;

    if (type === "register") {
      response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Registered successfully");
        router.push("/login");
      } else {
        toast.error("Failed to register");
      }
    }

    if (type === "login") {
      response = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (response && response.ok) {
        router.push("/");
      } else {
        toast.error("Email or password is incorrect");
      }
    }
  };

  return (
    <div className="auth">
      <div className="overlay">
        <div className="content">
          <img className="logo" src="/assets/images/logo.png" alt="logo" />
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            {type === "register" && (
              <>
                <div className="input">
                  <input
                    {...register("username", {
                      required: "Username is required",
                      validate: (value: string | undefined) => {
                        if (!value || value.length < 5) {
                          return "Username must be at least 5 characters";
                        }
                        return true;
                      },
                    })}
                    type="text"
                    placeholder="Username"
                    className="input-field"
                    autoComplete="off"
                  />
                  <PersonOutlined sx={{ color: "white" }} />
                </div>
                {errors.username && (
                  <p className="error">{errors.username.message}</p>
                )}
              </>
            )}

            <div className="input">
              <input
                {...register("email", {
                  required: "Email is required",
                })}
                type="email"
                placeholder="Email"
                className="input-field"
                autoComplete="on"
              />
              <EmailOutlined sx={{ color: "white" }} />
            </div>
            {errors.email && <p className="error">{errors.email.message}</p>}

            <div className="input">
              <input
                {...register("password", {
                  required: "Password is required",
                  validate: (value: string | undefined) => {
                    if (
                      !value ||
                      value.length < 6 ||
                      !value.match(/[!@#$%^&*()_+\-=[\]{};':"\\,.?":{}|<>]/)
                    ) {
                      return "Password must be at least 6 characters and contain at least one special character";
                    }
                    return true;
                  },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input-field"
              />
              <div
                className="cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <Visibility sx={{ color: "white" }} />
                ) : (
                  <VisibilityOff sx={{ color: "white" }} />
                )}
              </div>
            </div>
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}

            <button className="button" type="submit">
              {type === "login" ? "Login" : "Register"}
            </button>
          </form>

          {type === "login" ? (
            <Link href="/register">
              <p className="text-white">
                New to Netflix?{" "}
                <span className="link hover:underline">Sign up</span>
              </p>
            </Link>
          ) : (
            <Link href="/login">
              <p className="text-white">
                Already have an account?{" "}
                <span className="link hover:underline">Login</span>
              </p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
