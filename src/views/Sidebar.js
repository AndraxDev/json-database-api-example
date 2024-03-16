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
import SidebarElement from "./SidebarElement";
import LoadingView from "./LoadingView";

function Sidebar() {

    const [merchants, setMerchants] = useState([]);
    const [loading, setLoading] = useState(true);
    let [errorSnackbar, setErrorSnackbar] = React.useState(false);
    let [snackbarMessage, setSnackbarMessage] = React.useState("");

    const closeSnackbar = () => {
        setErrorSnackbar(false);
    }

    useEffect(() => {
        setLoading(true);

        fetch('http://' + (window.localStorage.getItem("host") || "localhost:5000") + '/api/v1/read?path=merchants')
            .then(response => response.json())
            .then(data => {
                /* Map to array */
                let merchants = [];

                Object.keys(data).forEach(e => {
                    /* Check data for integrity */
                    if (data[e].id !== undefined
                        && data[e].name !== undefined
                        && data[e].description !== undefined
                        && data[e].image !== undefined) {
                        merchants.push(data[e]);
                    }
                })

                setLoading(false);

                setMerchants(merchants);
            }).catch((error) => {
                setLoading(false);
                alert("Failed to connect to backend service. Please make sure backend service is setup and running. Also please make sure hostname is set correctly. Go to 'Maintenance' page to fix it.");
            })
    }, []);

    return (
        <div className="sidebar">
            <h3 className={"sidebar-title"}>Shops</h3>
            {
                loading ? <LoadingView/> :
                    <>
                        {merchants.length === 0 ? <p className={"placeholder"}>No merchants found</p> :
                            merchants.map((merchant, index) => {
                                return (
                                    <SidebarElement
                                        merchantLogo={merchant.image}
                                        merchantName={merchant.name}
                                        key={merchant.id}
                                        id={merchant.id}/>
                                );
                            })
                        }
                    </>
            }
        </div>
    );
}

export default Sidebar;
