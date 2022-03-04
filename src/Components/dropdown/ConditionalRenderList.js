// import React from 'react'

// function ConditionalRenderList({ value, List, setValue, toggle, setToggle }) {
//     console.log('list', List)
//     if (value) {
//         const filteredList = List.filter(item => item.med_name.toString().toLowerCase().startsWith(value.toLowerCase()))
//     }
//     if (filteredList.length) {
//         return (
//             toggle &&
//             (
//                 filteredList.map((item, index) => {
//                     <h1>{item}</h1>
//                 })
//             )
//         )
//     }
//     return (
//         <div>
//             Not found
//         </div>
//     )
// }

// export default ConditionalRenderList