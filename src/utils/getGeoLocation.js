export const getGeoLocation = () => {

    if (navigator.geolocation) {
        navigator.permissions
            .query({ name: "geolocation" })
            .then(function (result) {
                if (result.state === "granted") {
                    console.log(result.state);
                    //If granted then you can directly call your function here
                    navigator.geolocation.getCurrentPosition(function (
                        position
                    ) {
                        // latitude = position.coords.latitude;
                        // longitude = position.coords.longitude;
                        return {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        }

                        // dispatch(
                        //     setUserPos({
                        //         lat: position.coords.latitude,
                        //         lng: position.coords.longitude,
                        //     })
                        // ); // att: trigger update

                        // console.log("user_pos after grant", user_pos);
                    });
                } else if (result.state === "prompt") {
                    console.log(result.state);
                    return {}
                } else if (result.state === "denied") {
                    //todo: If denied then you have to show instructions to enable location
                    return {}
                }
                result.onchange = function () {
                    console.log('geolocation permission state changed', result.state);
                };
            });
    } else {
        alert("Sorry Not available!");
        return {}
    }
};
