import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = searchParams.get("token");

    if (!token) {
      toast({
        title: "Error",
        description: "Invalid reset password link.",
        variant: "destructive",
      });
      navigate("/auth/sign-in");
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Password reset successfully",
        description: "Your password has been reset. You can now sign in.",
      });
      navigate("/auth/sign-in");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to reset password.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-2xl font-semibold">Reset Password</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <Button disabled={loading} type="submit">
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
