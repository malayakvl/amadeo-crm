import React, { useEffect, useState } from 'react';
import { toggleModalPopup } from '../../lib/functions';
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import { scenariosSelector, showPopupSelector } from '../../redux/livesessions/selectors';
import { showPopupAction } from '../../redux/livesessions';
import DatePicker from 'react-datepicker';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-slider/assets/index.css';
import moment from 'moment';
import { Formik } from 'formik';
import * as Yup from 'yup';

const SchedulePopup: React.FC<any> = () => {
    const t = useTranslations();
    const dispatch = useDispatch();
    const showModal = useSelector(showPopupSelector);
    const scenarios = useSelector(scenariosSelector);
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(moment());
    // const [selectedScenarios, setSelectedScenarios] = useState<number[]>([]);
    // const [timeRange, setTimeRange] = useState([0, 0]);
    // const [cartRange, setCartRange] = useState([0, 0]);

    useEffect(() => {
        if (showModal) {
            toggleModalPopup('.modal-schedule');
        }
    }, [dispatch, showModal]);

    const setupTime = (value: any) => {
        setStartTime(value);
    };
    const updateScenarios = (id: number) => {
        console.log(id);
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
                                initialValues={{ min_time: 0 }}
                                validationSchema={SubmitSchema}
                                onSubmit={(values) => {
                                    console.log(values);
                                }}>
                                {(props) => {
                                    // const { handleChange } = props;
                                    // const onChangeMinTime = (e: any) => {
                                    //     const _timeRange = timeRange;
                                    //     _timeRange[0] = e.target.value;
                                    //     setTimeRange([0, e.target.value]);
                                    //     return handleChange(e);
                                    // };
                                    return (
                                        <form onSubmit={props.handleSubmit}>
                                            <div className="grid grid-cols-2 gap-4">
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
                                                {/*<div>*/}
                                                {/*    <span className="block text-gray-350 text-[18px] font-bold mb-5">*/}
                                                {/*        Session settings*/}
                                                {/*    </span>*/}
                                                {/*    <div className="relative mb-10">*/}
                                                {/*        <div className="block">*/}
                                                {/*            <span className="control-label">*/}
                                                {/*                {t('Session Duration')}*/}
                                                {/*            </span>*/}
                                                {/*            <Range*/}
                                                {/*                allowCross={false}*/}
                                                {/*                step={1}*/}
                                                {/*                min={0}*/}
                                                {/*                max={24}*/}
                                                {/*                onChange={onSliderTimeChange}*/}
                                                {/*                value={timeRange}*/}
                                                {/*            />*/}
                                                {/*        </div>*/}
                                                {/*    </div>*/}
                                                {/*    <div className="flex">*/}
                                                {/*        <InputText*/}
                                                {/*            icon={null}*/}
                                                {/*            label={'Minimum'}*/}
                                                {/*            name={'min_time'}*/}
                                                {/*            placeholder={'0 min'}*/}
                                                {/*            style={'max-w-[100px] mr-4'}*/}
                                                {/*            props={props}*/}
                                                {/*            onChange={onChangeMinTime}*/}
                                                {/*            tips={null}*/}
                                                {/*        />*/}
                                                {/*        <InputText*/}
                                                {/*            icon={null}*/}
                                                {/*            label={'Maximum'}*/}
                                                {/*            name={'max_time'}*/}
                                                {/*            placeholder={'24 hours'}*/}
                                                {/*            style={'max-w-[100px]'}*/}
                                                {/*            props={props}*/}
                                                {/*            tips={null}*/}
                                                {/*        />*/}
                                                {/*    </div>*/}
                                                {/*    <div className="relative mb-10">*/}
                                                {/*        <div className="block">*/}
                                                {/*            <span className="control-label">*/}
                                                {/*                {t('Cart Duration')}*/}
                                                {/*            </span>*/}
                                                {/*            <Range*/}
                                                {/*                allowCross={false}*/}
                                                {/*                step={1}*/}
                                                {/*                min={0}*/}
                                                {/*                max={24}*/}
                                                {/*                onChange={onSliderCartChange}*/}
                                                {/*                value={cartRange}*/}
                                                {/*            />*/}
                                                {/*        </div>*/}
                                                {/*    </div>*/}
                                                {/*    <div className="flex">*/}
                                                {/*        <InputText*/}
                                                {/*            icon={null}*/}
                                                {/*            label={'Minimum'}*/}
                                                {/*            name={'min'}*/}
                                                {/*            placeholder={'0 min'}*/}
                                                {/*            style={'max-w-[100px] mr-4'}*/}
                                                {/*            props={props}*/}
                                                {/*            tips={null}*/}
                                                {/*        />*/}
                                                {/*        <InputText*/}
                                                {/*            icon={null}*/}
                                                {/*            label={'Maximum'}*/}
                                                {/*            name={'max'}*/}
                                                {/*            placeholder={'24 hours'}*/}
                                                {/*            style={'max-w-[100px]'}*/}
                                                {/*            props={props}*/}
                                                {/*            tips={null}*/}
                                                {/*        />*/}
                                                {/*    </div>*/}
                                                {/*</div>*/}
                                                <div>
                                                    <span className="block text-gray-350 text-[18px] font-bold mb-5">
                                                        Available scenarios
                                                    </span>
                                                    <table className="float-table overflow-auto">
                                                        <tbody>
                                                            {scenarios?.map(
                                                                (
                                                                    item: Livesessions.DataScenario
                                                                ) => (
                                                                    <tr
                                                                        className="text-xs"
                                                                        key={item.id}>
                                                                        <td>
                                                                            <label
                                                                                htmlFor={`scen_${item.id}`}
                                                                                className="flex items-center cursor-pointer relative mt-1">
                                                                                <input
                                                                                    type="checkbox"
                                                                                    id={`scen_${item.id}`}
                                                                                    className="sr-only"
                                                                                    value={`switcher_${item.id}`}
                                                                                    onChange={() =>
                                                                                        updateScenarios(
                                                                                            item.id
                                                                                        )
                                                                                    }
                                                                                />
                                                                                <div className="toggle-bg bg-gray-200 border border-gray-200 rounded-full dark:bg-gray-700 dark:border-gray-600]" />
                                                                            </label>
                                                                        </td>
                                                                        <td>{item.name}</td>
                                                                    </tr>
                                                                )
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div className="flex justify-center">
                                                <button
                                                    type="button"
                                                    className="cancel mr-2.5"
                                                    onClick={() => alert('clear')}>
                                                    {t('Cancel')}
                                                </button>
                                                <button className="gradient-btn">
                                                    {t('Save')}
                                                </button>
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
