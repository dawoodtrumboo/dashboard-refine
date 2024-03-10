import React from 'react';
import { DatePicker, Radio } from 'antd';
import './picker.css'
const { RangePicker } = DatePicker;

const PickerSizesDemo: React.FC = ({ value, setRange, border, color }) => {





    const handleRangeChange = (dates: [Moment, Moment] | null) => {
        setRange(dates);
    };

    return (
        <div className='bg-[#ededed] flex items-center gap-1 px-2 py-[2px]'>

            <div className={`border-[1px] w-[12px] rounded-full`} style={{ border: `1px ${border} ${color}` }}>

            </div>

            <RangePicker className='picker' suffixIcon={null} separator={<span>-</span>} style={{ backgroundColor: 'transparent', color: '#AAA', border: 'none', gap: '0', padding: '0', margin: '0' }} format="MMM D, YYYY" defaultOpenValue={value ? value[0] : undefined} onChange={handleRangeChange} />

        </div>
    );
};

export default PickerSizesDemo;
