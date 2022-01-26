import React from 'react'

function ImageLinkForm(props) {
    return (
        <div className="form-container">
           <input type="text" name='imageURL' onChange={props.onInputChange} />
           <button onClick={props.onSubmit}>Detect</button> 
        </div>
    )
}

export default ImageLinkForm
