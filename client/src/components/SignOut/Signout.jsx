import { useMutation } from '@apollo/client';
import { SIGN_OUT_MUTATION } from '../../utils/mutations'

const SignOut = () => {
    const [signOut] = useMutation(SIGN_OUT_MUTATION);

    const handleSignOut = async () => {
        try {
            const { data } = await signOut();
            if (data.signOut.success) {
                // Redirect to the login page or perform other post-sign-out actions.
                // reflect the user's logged-out state.
            } else {
                console.error(data.signOut.message);
            }
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <button onClick={handleSignOut}>
            Sign Out
        </button>
    );
};

export default SignOut;

// react comp Navigate , useNav 