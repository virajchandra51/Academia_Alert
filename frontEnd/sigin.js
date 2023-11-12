import React from 'react';
import '../cssfiles/siginin.css';

function Sigin(){
  return(
    <>
        <div className='body'>
            
            <div className="row2">
            <img src={require('../images/logo.png')} alt="" className='logoimage'/>
                <div className="box">
                    <p className="heading">Sign In</p>
                    <p className="subheading">Email</p>
                    
                    <p><input type="email" placeholder="Email"/></p>
                    <hr className="line"/>
                    <p className="subheading">Password</p>
                    <p><input type="password" placeholder="password"/></p>
                    <hr className="line"/>
                    <p><button>Submit</button></p>
                    <p className="lastline">Do not have account?<a href="singup.html"><span>Sign Up</span></a></p>
                </div>
            </div>
        </div>
    </>
    )
}
export default Sigin;