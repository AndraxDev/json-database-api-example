import React, {useEffect} from 'react';
import {Alert, Snackbar} from "@mui/material";

function Maintenance() {

    let [snackbarMessage, setSnackbarMessage] = React.useState("");
    let [errorSnackbar, setErrorSnackbar] = React.useState(false);
    let [successSnackbar, setSuccessSnackbar] = React.useState(false);

    const setHostname = (hostname) => {
        localStorage.setItem("host", hostname);
        setSnackbarMessage("Hostname set successfully");
        setSuccessSnackbar(true);
    }

    const closeSnackbar = () => {
        setErrorSnackbar(false);
        setSuccessSnackbar(false);
    }

    useEffect(() => {
        document.getElementById("host").value = localStorage.getItem("host") || "localhost:5000";
    }, []);

    return (
        <div>
            <Snackbar
                open={successSnackbar}
                autoHideDuration={6000}
                transitionDuration={500}
                onClose={closeSnackbar}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}>

                <Alert
                    onClose={closeSnackbar}
                    severity="success"
                    variant="filled"
                    sx={{width: '100%'}}
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

            <h2 className={"page-title"}>Maintenance</h2>

            <form className={"vertical cart-item"} id="create-merchant">
                <h3 className={"page-subtitle"}>Set hostname</h3>
                <label className={"input-label"}>
                    Hostname:&nbsp;&nbsp;&nbsp;<input className={"input"} type="text" name="host" id="host"/>
                </label>
                <br/>
                <input className={"material-button"} type="submit" value="Save" onClick={(e) => {
                    e.preventDefault();

                    if (!document.getElementById("host").value) {
                        setSnackbarMessage("Hostname cannot be empty");
                        setSuccessSnackbar(false);
                        setErrorSnackbar(true);
                        return;
                    }

                    setHostname(document.getElementById("host").value);
                }}/>
            </form>
        </div>
    );
}

export default Maintenance;