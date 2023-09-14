import { useEffect } from "react";


function Success() {
    useEffect(() => {


        setTimeout(() => {
            window.location.assign("/");
        }, 3000);
    }

    );

return (
    <div className="text-center">
        <h1>Success!</h1>
        <h2>Thank you for your donation!</h2>
        <h2>You will now be redirected to the home page</h2>
    </div>
);
}

export default Success;