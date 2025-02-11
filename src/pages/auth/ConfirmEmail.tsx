
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";

const ConfirmEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const confirmEmail = async () => {
      const token = searchParams.get("token");
      const type = searchParams.get("type");

      if (!token || !type) {
        toast({
          title: "Error",
          description: "Invalid confirmation link.",
          variant: "destructive",
        });
        navigate("/auth/sign-in");
        return;
      }

      const email = searchParams.get("email");

      if (!email) {
        toast({
          title: "Error",
          description: "Invalid confirmation link: Email missing.",
          variant: "destructive",
        });
        navigate("/auth/sign-in");
        return;
      }

      try {
        const { error } = await supabase.auth.verifyOtp({
          token,
          email,
          type: 'email',
        });

        if (error) {
          throw error;
        }

        toast({
          title: "Email confirmed",
          description: "Your email has been successfully confirmed. You can now sign in.",
        });
        navigate("/auth/sign-in");
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to confirm email.",
          variant: "destructive",
        });
        navigate("/auth/sign-in");
      }
    };

    confirmEmail();
  }, [navigate, searchParams]);

  return (
    <div>
      <h1>Confirming email...</h1>
    </div>
  );
};

export default ConfirmEmail;
