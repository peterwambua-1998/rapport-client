import { toast } from "@/hooks/use-toast";

const ErrorToast = (msg) => {
    return toast({
        variant: "destructive",
        description: msg,
    })
}

export default ErrorToast;