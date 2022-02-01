import React, { useEffect, useState } from 'react';
import { toggleModalPopup } from '../../lib/functions';
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import { scenariosSelector, showPopupSelector } from '../../redux/livesessions/selectors';
import { showPopupAction } from '../../redux/livesessions';
import DatePicker from 'react-datepicker';
import 'rc-time-picker/assets/index.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-slider/assets/index.css';
import moment from 'moment';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { submitFormAction } from '../../redux/livesessions/actions';
import InputMask from 'react-input-mask';

const SchedulePopup: React.FC<any> = () => {
    const t = useTranslations();
    const dispatch = useDispatch();
    const showModal = useSelector(showPopupSelector);
    const scenarios = useSelector(scenariosSelector);
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(moment().format('HH:mm'));
    const [selectedScenarios, setSelectedScenarios] = useState<number[]>([]);

    useEffect(() => {
        if (showModal) {
            toggleModalPopup('.modal-schedule');
        }
    }, [dispatch, showModal]);

    const updateScenarios = (id: number) => {
        const _scenarios = selectedScenarios;
        if (_scenarios.includes(id)) {
            const index = _scenarios.findIndex((v: any) => v === id);
            if (index >= 0) {
                _scenarios.splice(index, 1);
            }
        } else {
            _scenarios.push(id);
        }
        setSelectedScenarios(_scenarios);
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
                                    const sessionData: any = {};
                                    sessionData.event_date = moment(startDate).format('YYYY-MM-DD');
                                    // sessionData.event_time = moment(startTime).format('HH:mm');
                                    sessionData.event_time = startTime;
                                    sessionData.scenarios = selectedScenarios;
                                    if ((values as any).id) {
                                        sessionData.id = (values as any).id;
                                    }
                                    dispatch(submitFormAction(sessionData));
                                }}>
                                {(props) => {
                                    return (
                                        <form onSubmit={props.handleSubmit}>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <span className="block text-gray-350 text-[18px] font-bold mb-5">
                                                        Choose a date
                                                    </span>
                                                    <div className="flex">
                                                        <div className="mb-4">
                                                            <label className="control-label">
                                                                {t('Date')}
                                                            </label>
                                                            <DatePicker
                                                                className="form-control date-input"
                                                                selected={startDate}
                                                                onChange={(date: any) => {
                                                                    setStartDate(date);
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="mb-4 ml-5">
                                                            <label className="control-label">
                                                                {t('Time Start')}
                                                            </label>
                                                            <div>
                                                                <InputMask
                                                                    style={{ width: '100px' }}
                                                                    className="form-control"
                                                                    mask="99:99"
                                                                    maskPlaceholder="HH:ii"
                                                                    onChange={(e) =>
                                                                        setStartTime(e.target.value)
                                                                    }
                                                                    value={startTime}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
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
                                                    onClick={() => {
                                                        dispatch(showPopupAction(false));
                                                        toggleModalPopup('.modal-schedule');
                                                    }}>
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
