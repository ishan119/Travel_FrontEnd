export class TpController{
    constructor() {
        console.log("obj created")
        $("#btnSearchTravelPackage").click(e=>{
            e.preventDefault();
            this.search();
        });
        console.log("obj created");
        $("#btnSaveTravelPackage").click(e=>{
            e.preventDefault();
            this.save();
        });
        console.log("obj created");
        $("#btnUpdateTravelPackage").click(e=>{
            e.preventDefault();
            this.update();
        })

        $("#btnClearTravelPackageDetails").click(e=>{
            e.preventDefault();
            this.clearAll();
        })
    }



    search(){
        console.log("pressed")
        var settings = {
            "url": "http://localhost:8085/api/v1/travel-package/"+$("#txtTravelPackageId").val(),
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwc2FtcGF0aEBnbWFpbC5jb20iLCJ1c2VyTmFtZSI6IlBhc2kiLCJ1c2VyUGFzc3dvcmQiOiI0NDQ0NCIsInJvbGVzIjpbIlRQX0FkbWluIl0sImV4cCI6MTkxNDc4NTA2M30._XxCWQE4JhaUCg6y2WVOpcU4brfgOS-UbsT1oO6sb10"
            },
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            $("#txtTpHotelCount").val(response.hotelCount);
            $("#txtTpPlaceCOunt").val(response.areaCount);
            $("#txtTpEstimatedPrice").val(response.estimatedPrice);
            $("#optTpCategory").val(response.category);
            $("#txtTpDayCount").val(response.dayCount);
        });
    }

    save(){
        let hotel_count = $("#txtTpHotelCount").val();
        let place_count =$("#txtTpPlaceCOunt").val();
        let estimated_price =$("#txtTpEstimatedPrice").val();
        let category =$("#optTpCategory").val();
        let dayCount =$("#txtTpDayCount").val();

        var settings = {
            "url": "http://localhost:8085/api/v1/travel-package",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwc2FtcGF0aEBnbWFpbC5jb20iLCJ1c2VyTmFtZSI6IlBhc2kiLCJ1c2VyUGFzc3dvcmQiOiI0NDQ0NCIsInJvbGVzIjpbIlRQX0FkbWluIl0sImV4cCI6MTkxMzgyNjUxMn0.dLVLBFaZz7bgefdcBhJOSz-o46Oby_GDmjbuz8EK3W4"
            },
            "data": JSON.stringify({
                "hotelCount": hotel_count,
                "areaCount": place_count,
                "estimatedPrice": estimated_price,
                "category": category,
                "dayCount": dayCount
            }),
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
        });
    }


    update(){
        let id = $("#txtTravelPackageId").val();
        let hotel_count = $("#txtTpHotelCount").val();
        let place_count =$("#txtTpPlaceCOunt").val();
        let estimated_price =$("#txtTpEstimatedPrice").val();
        let category =$("#optTpCategory").val();
        let dayCount =$("#txtTpDayCount").val();

        var settings = {
            "url": "http://localhost:8085/api/v1/travel-package",
            "method": "PUT",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwc2FtcGF0aEBnbWFpbC5jb20iLCJ1c2VyTmFtZSI6IlBhc2kiLCJ1c2VyUGFzc3dvcmQiOiI0NDQ0NCIsInJvbGVzIjpbIlRQX0FkbWluIl0sImV4cCI6MTkxMzgyNjUxMn0.dLVLBFaZz7bgefdcBhJOSz-o46Oby_GDmjbuz8EK3W4"
            },
            "data": JSON.stringify({
                "id": id,
                "hotelCount": hotel_count,
                "areaCount": place_count,
                "estimatedPrice": estimated_price,
                "category": category,
                "dayCount": dayCount
            }),
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
        });
    }

    clearAll(){
        $("#txtTravelPackageId").val("");
        $("#txtTpHotelCount").val("");
        $("#txtTpPlaceCOunt").val("");
        $("#txtTpEstimatedPrice").val("");
        $("#optTpCategory").val(0);
        $("#txtTpDayCount").val("");
    }
}

new TpController();