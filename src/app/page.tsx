import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
    const {isAuthenticated} = useAuth();
    const router = useRouter();
    
    if (isAuthenticated) {
        router.push("/dashboard");
    } else {
        router.push("/login");
    }

}