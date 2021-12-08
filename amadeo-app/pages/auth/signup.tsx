import Link from 'next/link';
import FullLayout from '../../components/layout/FullLayout';

export default function Signup() {
    return (
        <div className="mt-10 w-1000 bg-white flex">
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
                <div>
                    Already have an account? Sign in here!
                </div>
            </div>
            <div>
                <div>
                    How would you like to Sign up as? :
                    <div>
                        Buyer
                    </div>
                    <div>
                        Merchant
                    </div>
                </div>
                <div>
                    <div>
                        Continue with Facebook
                    </div>
                    <div>
                        Continue with Twitter
                    </div>
                    <div>
                        Continue with Google
                    </div>
                    <div>or</div>
                    <div>Email</div>
                    <div>
                        I have read and acept the terms of use
                    </div>
                    <div>Sign up</div>
                </div>
            </div>
        </div>
    );
}
Signup.Layout = FullLayout;
