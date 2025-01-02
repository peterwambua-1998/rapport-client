import { toast } from "@/hooks/use-toast";

const SuccessToast = (msg) => {
    return toast({
        description: msg,
    })
}

export default SuccessToast;