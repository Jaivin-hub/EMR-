import React from 'react'
import Select from 'react-select';

function SampleSearch() {
    const aquaticCreatures = [
        { label: 'Shark' },
        { label: 'Dolphin', value: 'Dolphin' },
        { label: 'Whale', value: 'Whale' },
        { label: 'Octopus', value: 'Octopus' },
        { label: 'Crab', value: 'Crab' },
        { label: 'Lobster', value: 'Lobster' },
    ];
    return (
        <div className="align-items-center justify-content-center">
            <Select
                options={aquaticCreatures}
            />
        </div>
    )
}

export default SampleSearch