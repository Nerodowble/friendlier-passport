
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthCard } from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate("/dashboard");
    } catch (error) {
      // Error is handled by AuthContext
    }
  };

  return (
    <div className="container relative min-h-screen flex items-center justify-center">
      <div className="lg:p-8">
        <AuthCard
          title="Sign In"
          description="Enter your email below to sign in to your account"
          footer={
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/auth/sign-up" className="text-primary hover:underline">
                Create account
              </Link>
            </p>
          }
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
            <div className="text-sm">
              <Link to="/auth/forgot-password" className="hover:underline">
                Forgot Password?
              </Link>
            </div>
          </form>
        </AuthCard>
      </div>
    </div>
  );
};

export default SignIn;
