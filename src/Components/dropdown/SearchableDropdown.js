import React, { useState } from 'react'
import '../../assets/css//searchableDropdown.css'
import SearchPage from '../SearchPage';


function SearchableDropdown({ List, setSelectedMedicineName, setMedicineScientificName, setSelectedMedicineType }) {
    const [isActive, setIsActive] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedIndex, setSelectedIndex] = useState("")
    const [showOptions, setShowOptions] = useState(false)



    const selectValueHandler = (med_name, index) => {
        setSearchTerm(med_name)
        setIsActive(!isActive)
        setSelectedIndex(index)
        List.map((item, i) => {
            if (item.med_name == med_name) {
                setSelectedMedicineName(item.med_name)
                setMedicineScientificName(item.s_med_name)
                setSelectedMedicineType(item.med_type)
            }
        })

    }

    const options = [
        { name: 'Swedish', value: 'sv' },
        { name: 'English', value: 'en' },
        {
            type: 'group',
            name: 'Group name',
            items: [
                { name: 'Spanish', value: 'es' },
            ]
        },
    ];

    return (
        <div className="dropdown">
            <div className="dropdown-btn h-10" >
                <SearchPage  searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            {!searchTerm == ""?

                List.filter((val) => {
                    if (searchTerm == '') {
                        return val
                    } else if (val.med_name?.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return val
                    }
                }).map((item, i) => {
                    return (
                        <div className="dropdown-content">
                            <div className="dropdown-item" onClick={() => { selectValueHandler(item.med_name, i) }}>
                                {item.med_name}
                            </div>
                        </div>
                    )
                })

                : null
            }

        </div>
    )
}

export default SearchableDropdown