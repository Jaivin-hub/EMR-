import React from 'react'
import { FaRegCopyright } from 'react-icons/fa'

function Footer() {
    return (
        <footer className="row d-flex justify-content-center bg-gray-300 shadow-lg space-x-3 font-bold text-gray-700">
            <div>
                <FaRegCopyright className="mt-1" />
            </div>
            <div>
                Meddbot. All rights reserved
            </div>
        </footer>
    )
}

export default Footer