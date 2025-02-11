
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { AuthCard } from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  const { user } = useAuth();

  // If user is already logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="container relative min-h-screen flex items-center justify-center">
      <div className="lg:p-8">
        <AuthCard
          title="Welcome"
          description="Please sign in to your account or create a new one"
        >
          <div className="flex flex-col gap-4">
            <Link to="/auth/sign-in">
              <Button className="w-full" variant="default">
                Sign In
              </Button>
            </Link>
            <Link to="/auth/sign-up">
              <Button className="w-full" variant="outline">
                Create Account
              </Button>
            </Link>
          </div>
        </AuthCard>
      </div>
    </div>
  );
};

export default Index;
