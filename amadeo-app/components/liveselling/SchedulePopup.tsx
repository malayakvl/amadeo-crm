import React, { useEffect, useState } from 'react';
import { toggleModalPopup } from '../../lib/functions';
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import { scenariosSelector, showPopupSelector } from '../../redux/livesessions/selectors';
import { showPopupAction } from '../../redux/livesessions';
import DatePicker from 'react-datepicker';
import TimePicker from 'rc-time-picker';
import { Range } from 'rc-slider';
import 'rc-time-picker/assets/index.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-slider/assets/index.css';
import moment from 'moment';
import { InputText } from '../_form';
import { Formik } from 'formik';
import * as Yup from 'yup';

const SchedulePopup: React.FC<any> = () => {
    const t = useTranslations();
    const dispatch = useDispatch();
    const showModal = useSelector(showPopupSelector);
    const scenarios = useSelector(scenariosSelector);
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(moment());
    const [priceRange, setPriceRange] = useState([0, 0]);

    useEffect(() => {
        if (showModal) {
            toggleModalPopup('.modal-schedule');
        }
    }, [dispatch, showModal]);

    const setupTime = (value: any) => {
        setStartTime(value);
    };
    const onSliderPriceChange = (_value: any) => {
        setPriceRange(_value);
    };
    const SubmitSchema = Yup.object().shape({});

    return (
        <div className="modal modal-schedule opacity-0 pointer-events-none fixed w-full h-full top-0 left-0 flex items-center justify-center">
            <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" />
            <div className="modal-container bg-white w-12/12 md:max-w-screen-xl mx-auto rounded shadow-lg z-50 overflow-y-auto">
                <div
                    className="modal-content py-4 text-left px-6 overflow-auto"
                    style={{ maxHeight: '90vh' }}>
                    <div className="flex justify-between items-center pb-3">
                        <p className="text-2xl font-bold">{t('New Live Session')}</p>
                        <div
                            className="modal-close cursor-pointer z-50"
                            role="presentation"
                            onClick={() => {
                                dispatch(showPopupAction(false));
                                toggleModalPopup('.modal-schedule');
                            }}>
                            <img
                                src="/images/close-modal.svg"
                                className="fill-current text-black"
                                alt={''}
                            />
                        </div>
                    </div>

                    {/*Body*/}
                    <div>
                        <div className="flex">
                            <Formik
                                enableReinitialize
                                initialValues={{}}
                                validationSchema={SubmitSchema}
                                onSubmit={(values) => {
                                    console.log(values);
                                }}>
                                {(props) => {
                                    // const { handleChange } = props;
                                    // const onChangeConfigured = (e: any) => {
                                    //     // change selectors via text fields will be here
                                    //     return handleChange(e);
                                    // };
                                    return (
                                        <form
                                            onSubmit={props.handleSubmit}
                                            className="grid grid-cols-3 gap-4">
                                            <div>
                                                <span className="block text-gray-350 text-[18px] font-bold mb-5">
                                                    Choose a date
                                                </span>
                                                <div className="mb-4">
                                                    <label className="control-label">
                                                        {t('Date')}
                                                    </label>
                                                    <DatePicker
                                                        className={'form-control'}
                                                        selected={startDate}
                                                        onChange={(date: any) => {
                                                            setStartDate(date);
                                                            // dispatch(
                                                            //     updateFormEventAction({
                                                            //         type: 'date_event',
                                                            //         modifier: moment(date).format('YYYY-MM-DD')
                                                            //     })
                                                            // );
                                                        }}
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="control-label">
                                                        {t('Time Start')}
                                                    </label>
                                                    <div>
                                                        <TimePicker
                                                            className="mr-5"
                                                            value={startTime}
                                                            defaultValue={startTime}
                                                            showSecond={false}
                                                            inputReadOnly={true}
                                                            onChange={(v) => setupTime(v)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <span className="block text-gray-350 text-[18px] font-bold mb-5">
                                                    Session settings
                                                </span>
                                                <div className="relative mb-10">
                                                    <div className="block">
                                                        <span className="control-label">
                                                            {t('Session Duration')}
                                                        </span>
                                                        <Range
                                                            allowCross={false}
                                                            step={1}
                                                            min={0}
                                                            max={24}
                                                            onChange={onSliderPriceChange}
                                                            value={priceRange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex">
                                                    <InputText
                                                        icon={null}
                                                        label={'Minimum'}
                                                        name={'min'}
                                                        placeholder={'0 min'}
                                                        style={'max-w-[100px] mr-4'}
                                                        props={props}
                                                        tips={null}
                                                    />
                                                    <InputText
                                                        icon={null}
                                                        label={'Maximum'}
                                                        name={'max'}
                                                        placeholder={'24 hours'}
                                                        style={'max-w-[100px]'}
                                                        props={props}
                                                        tips={null}
                                                    />
                                                </div>
                                                <div className="relative mb-10">
                                                    <div className="block">
                                                        <span className="control-label">
                                                            {t('Cart Duration')}
                                                        </span>
                                                        <Range
                                                            allowCross={false}
                                                            step={1}
                                                            min={0}
                                                            max={24}
                                                            onChange={onSliderPriceChange}
                                                            value={priceRange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex">
                                                    <InputText
                                                        icon={null}
                                                        label={'Minimum'}
                                                        name={'min'}
                                                        placeholder={'0 min'}
                                                        style={'max-w-[100px] mr-4'}
                                                        props={props}
                                                        tips={null}
                                                    />
                                                    <InputText
                                                        icon={null}
                                                        label={'Maximum'}
                                                        name={'max'}
                                                        placeholder={'24 hours'}
                                                        style={'max-w-[100px]'}
                                                        props={props}
                                                        tips={null}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <span className="block text-gray-350 text-[18px] font-bold mb-5">
                                                    Available scenarios
                                                </span>
                                                <table className="float-table overflow-auto">
                                                    {scenarios?.map(
                                                        (item: Livesessions.DataScenario) => (
                                                            <tr className="text-xs" key={item.id}>
                                                                <td>
                                                                    <label
                                                                        htmlFor={`scen_${item.id}`}
                                                                        className="flex items-center cursor-pointer relative mt-1">
                                                                        <input
                                                                            type="checkbox"
                                                                            id={`scen_${item.id}`}
                                                                            className="sr-only"
                                                                            value={`switcher_${item.id}`}
                                                                        />
                                                                        <div className="toggle-bg bg-gray-200 border border-gray-200 rounded-full dark:bg-gray-700 dark:border-gray-600]" />
                                                                    </label>
                                                                </td>
                                                                <td>{item.name}</td>
                                                            </tr>
                                                        )
                                                    )}
                                                </table>
                                            </div>
                                        </form>
                                    );
                                }}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchedulePopup;
