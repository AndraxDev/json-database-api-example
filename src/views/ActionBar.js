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

import React from 'react';
import {useNavigate} from "react-router-dom";

function ActionBar() {

    const navigate = useNavigate();

    return (
        <div className="action-bar">
            <button className="app-title" onClick={() => {
                navigate("/");
            }}>Delivery app
            </button>
            <div className="action-bar-buttons">
                <button className="button-link" onClick={() => {
                    navigate("/maintenance");
                }}>Configure API
                </button>
                <span className="button-link-delim">|</span>
                <button className="button-link" onClick={() => {
                    navigate("/admin");
                }}>Admin
                </button>
                <span className="button-link-delim">|</span>
                <button className="button-link" onClick={() => {
                    navigate("/cart");
                }}>Cart
                </button>
                <span className="button-link-delim">|</span>
                <button className="button-link" onClick={() => {
                    navigate("/orders");
                }}>My orders
                </button>
                <span className="button-link-delim">|</span>
                <button className="button-link" onClick={() => {
                    navigate("/coupons");
                }}>Coupons
                </button>
            </div>
        </div>
    );
}

export default ActionBar;
