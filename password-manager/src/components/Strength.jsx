import React from 'react'

export default function Strengt(props) {
    const password = props.password

    return (
        <>
            <div className="d-flex flex-column align-items-start" >
                <span> [ {
                    password.match(/.*[A-Z].*/)
                        ? <span className="fa fa-check" style={{ color: 'green' }} ></span>
                        : <span className="fa fa-remove red" style={{ color: 'red' }} ></span>
                } ]
                                Password setidaknya harus memiliki satu karakter huruf besar. ( upper-case ) </span>
                <span> [ {
                    password.match(/.*[a-z].*/)
                        ? <span className="fa fa-check" style={{ color: 'green' }} ></span>
                        : <span className="fa fa-remove red" style={{ color: 'red' }} ></span>
                } ]
                                Password setidaknya harus memiliki satu karakter huruf kecil. ( lower-case ) </span>
                <span> [ {
                    password.match(/.*[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E].*/)
                        ? <span className="fa fa-check" style={{ color: 'green' }} ></span>
                        : <span className="fa fa-remove red" style={{ color: 'red' }} ></span>
                } ]
                                Password setidaknya harus memiliki satu karakter huruf special. ( #$@!&%... ) </span>
                <span> [ {
                    password.match(/.*\d.*/)
                        ? <span className="fa fa-check" style={{ color: 'green' }} ></span>
                        : <span className="fa fa-remove red" style={{ color: 'red' }} ></span>
                } ]
                                Password setidaknya harus memiliki satu angka.</span>
                <span> [ {
                    password.length > 5
                        ? <span className="fa fa-check" style={{ color: 'green' }} ></span>
                        : <span className="fa fa-remove red" style={{ color: 'red' }} ></span>
                } ]
                                Password setidaknya harus memiliki  panjang (length) lebih dari 5 karakter.</span>
            </div>
            <br />
        </>
    )
}