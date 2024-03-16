/*
* Copyright (c) 2024 Dmytro Ostapenko. All rights reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* */

import React, {useEffect, useState} from 'react';
import LoadingPage from "./LoadingPage";
import Coupon from "../views/Coupon";
import {Alert, Snackbar} from "@mui/material";

function Coupons() {

    let [coupons, setCoupons] = useState([]);
    let [loading, setLoading] = useState(true);
    let [snackbarMessage, setSnackbarMessage] = React.useState("");
    let [errorSnackbar, setErrorSnackbar] = React.useState(false);
    let [successSnackbar, setSuccessSnackbar] = React.useState(false);

    useEffect(() => {
        setLoading(true);

        fetch('http://' + (window.localStorage.getItem("host") || "localhost:5000") + '/api/v1/read?path=coupons')
            .then(response => response.json())
            .then(data => {
                let coupons = [];
                Object.keys(data).forEach(e => {
                    /* Check data for integrity */
                    if (data[e].id !== undefined
                        && data[e].code !== undefined
                        && data[e].description !== undefined
                        && data[e].discount !== undefined
                        && data[e].product !== undefined
                        && data[e].image !== undefined) {
                        coupons.push(data[e]);
                    }
                })

                setLoading(false);

                setCoupons(coupons);
            }).catch((error) => {
                setLoading(false);
                setErrorSnackbar(true);
                setSnackbarMessage("Error getting data: " + error);
            });
    }, []);

    const copyCallback = () => {
        setSuccessSnackbar(true);
        setSnackbarMessage("Coupon code copied to clipboard");
    }

    const closeSnackbar = () => {
        setErrorSnackbar(false);
        setSuccessSnackbar(false);
    }

    return (
        <div>
            <Snackbar
                open={successSnackbar}
                autoHideDuration={6000}
                transitionDuration={500}
                onClose={closeSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>

                <Alert
                    onClose={closeSnackbar}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <Snackbar
                open={errorSnackbar}
                autoHideDuration={6000}
                transitionDuration={500}
                onClose={closeSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>

                <Alert
                    onClose={closeSnackbar}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            {loading ? <LoadingPage/> : <div className={"products-grid"}>
                {
                    coupons.length === 0 ? <p style={{
                        width: "100%",
                        marginTop: "16px",
                        }} className={"placeholder"}>No coupons found</p> :
                        coupons.map((coupon, index) => {
                            return (
                                <Coupon
                                    code={coupon.code}
                                    description={coupon.description}
                                    discount={parseFloat(coupon.discount.toString())}
                                    product={coupon.product}
                                    image={coupon.image}
                                    id={coupon.id}
                                    callback={copyCallback}
                                    key={coupon.id}/>
                            );
                        })
                }
            </div>}
        </div>
    );
}

export default Coupons;