import { Toaster } from "sonner";

function Sonner() {
    return (
        <Toaster
            position="top-right"
            richColors
            closeButton
            duration={3000}
            expand={false}
            visibleToasts={4}
        />
    );
}

export default Sonner;