import * as Yup from 'yup';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { Formik } from 'formik';
import { InputText } from '../_form';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { profileSelector } from '../../redux/profile/selectors';
import { fetchProfileAction, updateProfileAction } from '../../redux/profile';
import { useSession } from 'next-auth/client';
import { baseApiUrl } from '../../constants';

function Profile() {
    const [session] = useSession();
    const t = useTranslations();
    const dispatch = useDispatch();
    const profileData = useSelector(profileSelector);
    const filePickerRef = useRef<HTMLInputElement>(null);
    const [imagePost, setImagePost] = useState<File>();
    const [isNewPhoto, setIsNewPhoto] = useState(false);

    useEffect(() => {
        dispatch(fetchProfileAction());
    }, [dispatch, session?.user?.email]);

    const addImageToPost = (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (!filePickerRef.current?.files?.length) return;
        setImagePost(filePickerRef.current.files[0]);
        setIsNewPhoto(true);
    };

    const SubmitSchema = Yup.object().shape({
        email: Yup.string()
            .email(t('Must be a valid email'))
            .required(t('You must enter your email')),
        last_name: Yup.string().required(t('You must enter your family name')),
        first_name: Yup.string().required(t('You must enter your first name')),
        identification_number: Yup.string().required(t('You must enter your tax-ID')),
        full_address: Yup.string().required(t('You must enter your address')),
        phone: Yup.string().required(t('You must enter your phone number'))
    });

    return (
        <Formik
            enableReinitialize
            initialValues={profileData}
            validationSchema={SubmitSchema}
            onSubmit={(values) => {
                const formData = new FormData();
                Object.keys(values).forEach((key: string) => {
                    formData.append(key, (values as any)[key]);
                });
                if (imagePost) {
                    formData.append('photo', imagePost);
                }
                dispatch(updateProfileAction(formData));
            }}>
            {(props) => (
                <form onSubmit={props.handleSubmit} className="mt-5">
                    <div className="flex mb-4 mt-4 lg:w-1/4">
                        <div className="rounded-full w-[160px] h-[160px] bg-gray-180 flex relative">
                            {imagePost && (
                                <img
                                    alt=""
                                    className="rounded-full w-[160px] h-[160px]"
                                    src={URL.createObjectURL(imagePost)}
                                />
                            )}
                            {profileData.photo && !isNewPhoto && (
                                <img
                                    alt=""
                                    className="rounded-full w-[160px] h-[160px]"
                                    src={baseApiUrl + profileData.photo}
                                />
                            )}
                            <div className="absolute right-0 bottom-0 cursor-pointer">
                                <Image
                                    role="presentation"
                                    src="/images/profile-upload.svg"
                                    onClick={() => filePickerRef.current?.click()}
                                    width={46}
                                    height={46}
                                    layout="fixed"
                                />
                                <input
                                    ref={filePickerRef}
                                    type="file"
                                    onChange={addImageToPost}
                                    hidden
                                />
                            </div>
                        </div>
                        <div className="text-base text-gray-350 font-bold ml-10 w-[180px]">
                            {t('Update your Profile picture:')}
                            <span className="block text-sm text-gray-350 font-medium mt-6">
                                {t('You can use jpg or png, photo file formats')}
                            </span>
                        </div>
                    </div>
                    <InputText
                        icon={'f-email'}
                        label={null}
                        name={'email'}
                        placeholder={'Email Address'}
                        style={'lg:w-1/4'}
                        props={props}
                    />

                    <InputText
                        icon={'f-fname'}
                        label={null}
                        name={'first_name'}
                        placeholder={'Name'}
                        style={'lg:w-1/4'}
                        props={props}
                    />

                    <InputText
                        icon={'f-lname'}
                        label={null}
                        name={'last_name'}
                        placeholder={'Sername'}
                        style={'lg:w-1/4'}
                        props={props}
                    />

                    <InputText
                        icon={'f-company'}
                        label={null}
                        name={'company_name'}
                        placeholder={'Company Name'}
                        style={'lg:w-1/4'}
                        props={props}
                    />

                    {/*<InputText*/}
                    {/*    icon={'f-company-id'}*/}
                    {/*    label={null}*/}
                    {/*    name={'full_address'}*/}
                    {/*    placeholder={'Full Address'}*/}
                    {/*    props={props}*/}
                    {/*/>*/}

                    <InputText
                        icon={'f-company-id'}
                        label={null}
                        name={'identification_number'}
                        placeholder={'Company ID'}
                        style={'lg:w-1/6'}
                        props={props}
                    />

                    <InputText
                        icon={'f-vat'}
                        label={null}
                        name={'vat'}
                        placeholder={'VAT (If applicable)'}
                        style={'lg:w-1/6'}
                        props={props}
                    />

                    <InputText
                        icon={'f-phone'}
                        label={null}
                        name={'phone'}
                        placeholder={'Phone number'}
                        style={'lg:w-1/4'}
                        props={props}
                    />

                    <div className="mt-10 mb-7 block border border-gray-180 border-b-0" />
                    <button type="submit" className="gradient-btn">
                        {t('Save')}
                    </button>
                </form>
            )}
        </Formik>
    );
}

export default Profile;
