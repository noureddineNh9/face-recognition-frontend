import React from 'react'

function Navigation(props) {
    return (
        <nav style={{
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
            padding:'10px 20px',
            boxShadow:"rgba(0, 0, 0, 0.16) 0px 1px 4px",
            

        }}>
            <h4>Face Recognition</h4>
            <div>
                {
                    props.isSignin 
                        ? <button className="button-link" onClick={()=> props.changeRoute('signin')}>Sign Out</button> 
                        : <>
                            <button className="button-link" onClick={()=> props.changeRoute('signin')}>Sign In</button>
                            <button className="button-link" onClick={()=> props.changeRoute('register')}>Register</button>
                        </>

                }
                
            </div>
        </nav>
        
    )
}

export default Navigation
