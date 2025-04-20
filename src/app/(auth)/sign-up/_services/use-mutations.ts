import { signUp } from "@/app/(auth)/sign-up/_services/mutations";
import { SignUpSchema } from "@/app/(auth)/sign-up/_types/signUpSchema";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useSignUp = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: SignUpSchema) => {
      await signUp(data);
    },
    onSuccess: () => {
      toast.success("Signed up successfully.");
      router.replace("/sign-in");
    },
  });
};

export { useSignUp };
