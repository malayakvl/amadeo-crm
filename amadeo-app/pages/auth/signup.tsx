import FullLayout from '../../components/layout/FullLayout';

export default function Signup() {
    return (
        <div className="flex justify-center">
            <div className="mt-10 flex w-1000 bg-white">
                <div>
                    <div>
                        Sing up <br></br>
                    today!
                </div>
                    <div>
                        Lorem ipsum dolor<br></br>
                    sit amet, consectetur<br></br>
                    adipiscing elit.
                </div>
                    <div>
                        Lorem ipsum dolor sit amet,<br></br>
                    consectetur adipiscing elit.
                </div>
                    <div>Already have an account? Sign in here!</div>
                </div>
                <div>
                    <div>
                        How would you like to Sign up as? :<div>Buyer</div>
                        <div>Merchant</div>
                    </div>
                    <div>
                        <div>Continue with Facebook</div>
                        <div>Continue with Twitter</div>
                        <div>Continue with Google</div>
                        <div>or</div>
                        <div>Email</div>
                        <div>I have read and acept the terms of use</div>
                        <div>Sign up</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
Signup.Layout = FullLayout;
