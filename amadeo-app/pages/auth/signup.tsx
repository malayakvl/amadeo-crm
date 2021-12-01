import Link from 'next/link';

export default function Signup() {
    return (
        <div className="px-4">
            <div className="bg-white mx-auto max-w-3xl rounded-lg my-16 p-8">
                <Link href={'/auth/customer'}>
                    <a
                        className="w-full block bg-gradient-to-r from-green-300 to-blue-300 mb-10
                            hover:from-pink-500 hover:to-orange-500 text-white px-4 py-2 rounded">
                        Register as Customer
                    </a>
                </Link>
                <Link href={'/auth/buyer'}>
                    <a
                        className="w-full block bg-gradient-to-r from-green-300 to-blue-300
                            hover:from-pink-500 hover:to-orange-500 text-white px-4 py-2 rounded">
                        Register as Buyer
                    </a>
                </Link>
            </div>
        </div>
    );
}
