class TravelUtil {
    travel(trv) {
        console.log();

        
        const travelTypes = this.listTravelTypes();
        let returnTravel = {};
        travelTypes.map((row) => {

            let keyOut = "";
            Object.keys(trv).map((key) => {
                if(key === row.name)
                keyOut = row.name
            } );
            if (trv != null && keyOut === row.name) {
                
                returnTravel = {
                    id: String(Math.random().toFixed(2)),
                    time: "1",
                    type: row.type
                }
            }
        })
        return returnTravel;
    }

    listTravelTypes() {
        return [
            {
                name: "rtlArrival",
                type: "aa"
            },
            {
                name: "rtlDeparture",
                type: "aa"
            },
            {
                name: "rtlTravelFrom",
                type: "Regular"
            }
            ,
            {
                name: "rtlTravelTo",
                type: "Regular"
            },
            // "amtlArrival",
            // "amtlDeparture",
            // "amtlTravelFrom",
            // "amtlTravelTo",
            // "otlArrival",
            // "otlDeparture",
            // "otlTravelFrom",
            // "otlTravelTo"
        ]
    }


}
export default TravelUtil