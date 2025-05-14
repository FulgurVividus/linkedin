import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios.js";
import { toast } from "react-hot-toast";
import { Loader } from "lucide-react";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // sign up mutation
  const { mutate: signUpMutation, isLoading } = useMutation({
    mutationFn: async (dataForm) => {
      const res = await axiosInstance.post("/auth/signup", dataForm);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Account created successfully");
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Something went wrong");
    },
  });

  function handleSignUp(e) {
    e.preventDefault();
    signUpMutation({ name, email, username, password });
    clearFields();
  }

  function clearFields() {
    setName("");
    setEmail("");
    setUsername("");
    setPassword("");
  }

  return (
    <form onSubmit={handleSignUp} className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input input-bordered w-full"
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input input-bordered w-full"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input input-bordered w-full"
      />
      <input
        type="password"
        placeholder="Password (6+ characters)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input input-bordered w-full"
      />

      <button
        type="submit"
        title="Agree & Join"
        disabled={isLoading}
        className="btn btn-primary w-full text-white"
      >
        {isLoading ? (
          <Loader className="size-5 animate-spin" />
        ) : (
          "Agree & Join"
        )}
      </button>
    </form>
  );
};

export default SignUpForm;
