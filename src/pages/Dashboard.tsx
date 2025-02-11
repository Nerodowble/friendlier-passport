
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { user, signOut } = useAuth();

  if (!user) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button variant="outline" onClick={signOut}>
          Sign Out
        </Button>
      </div>
      <div className="bg-card rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Welcome, {user.email}!</h2>
        <p className="text-muted-foreground">
          You are now signed in to your account.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
