import React, { Fragment, useEffect, useState } from 'react';
import { toggleModalPopup } from '../../../lib/functions';
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import {
    showChangeSubscriptionSelector,
    userSubscriptionSelector
} from '../../../redux/user/selectors';
import { showChangeSubscriptionFormAction } from '../../../redux/user';
import { updateSubscriptionAction } from '../../../redux/user/actions';

const ChangeSubscription: React.FC<any> = () => {
    const t = useTranslations();
    const dispatch = useDispatch();
    const showModal = useSelector(showChangeSubscriptionSelector);
    const subscriptionInfo = useSelector(userSubscriptionSelector);
    const [planId, setPlanId] = useState<any>('');

    useEffect(() => {
        if (showModal) {
            toggleModalPopup('.modal-seller-change-subscription');
        }
    }, [dispatch, showModal]);

    return (
        <div className="modal modal-seller-change-subscription opacity-0 pointer-events-none fixed w-full h-full top-0 left-0 flex items-center justify-center">
            <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" />
            <div className="modal-container bg-white w-12/12 md:max-w-screen-xl mx-auto rounded shadow-lg z-50 overflow-y-auto">
                <div
                    className="modal-content py-4 text-left px-6 overflow-auto"
                    style={{ maxHeight: '90vh' }}>
                    <div className="flex justify-between items-center pb-3">
                        <p className="text-2xl font-bold">{t('Change Plan')}</p>
                        <div
                            className="modal-close cursor-pointer z-50"
                            role="presentation"
                            onClick={() => {
                                dispatch(showChangeSubscriptionFormAction(false));
                                toggleModalPopup('.modal-seller-change-subscription');
                            }}>
                            <img
                                src="/images/close-modal.svg"
                                className="fill-current text-black"
                                alt={''}
                            />
                        </div>
                    </div>

                    {/*Body*/}
                    {subscriptionInfo?.id && (
                        <div>
                            <div className="flex flex-col">
                                {subscriptionInfo.defaultPayment && (
                                    <>
                                        <div className="flex justify-center">
                                            <select
                                                name="plan_id"
                                                style={{ width: '250px' }}
                                                value={planId}
                                                className="form-control w-full"
                                                onChange={(e) => {
                                                    setPlanId(e.target.value);
                                                }}>
                                                <option>Select Plan</option>
                                                {subscriptionInfo.dbPlans.map((plan: any) => (
                                                    <Fragment key={plan.stripe_id}>
                                                        {plan.stripe_id !==
                                                            subscriptionInfo.plan.id && (
                                                            <option value={plan.stripe_id}>
                                                                {plan.name}
                                                            </option>
                                                        )}
                                                    </Fragment>
                                                ))}
                                            </select>
                                        </div>
                                        <button
                                            className="gradient-btn mt-4"
                                            onClick={() =>
                                                dispatch(updateSubscriptionAction(planId))
                                            }>
                                            {t('Save')}
                                        </button>
                                    </>
                                )}
                                {!subscriptionInfo?.defaultPayment && (
                                    <p>{t('Add and setup default payment first')}</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChangeSubscription;
