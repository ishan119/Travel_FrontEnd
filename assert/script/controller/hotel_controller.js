import {getKey} from "../db/db.js";

export class HotelController{
    constructor() {
        $("#btnSaveHotel").click(e=>{
            e.preventDefault();
            this.save();
        })

        $("#txtSearchHotel").keydown(e => {
            if (e.keyCode == 13) {
                e.preventDefault();
                let customerMail = $('#txtSearchHotel').val();
                console.log(customerMail)
                this.search()
            }

        });

        $("#btnUpdateHotel").click(e => {
            e.preventDefault();
            this.update();
        })

    }

    save(){
        let h_name = $("#hotel_name").val();
        let h_address = $("#hotel_address").val();
        let h_star_rate = $("#hotel_star_rate").val();
        let isPetAllowed = $("#check-5:checked") ? true : false;
        let h_location = $("#hotel_location").val();
        let h_mobile1 = $("#hotel_mobile1").val();
        let h_mobile2 = $("#hotel_mobile2").val();
        let h_email = $("#hotel_email").val();
        let full_board_with_ac_luxury_room_double = $("#type1").val();
        let half_board_with_ac_luxury_room_double = $("#type2").val();
        let full_board_with_ac_luxury_room_triple = $("#type3").val();
        let half_board_with_ac_luxury_room_triple = $("#type4").val();
        let h_view1 = $("#hotel_view1").prop("files")[0];
        let h_view2 = $("#hotel_view2").prop("files")[0];
        let h_view3 = $("#hotel_view3").prop("files")[0];
        let h_view4 = $("#hotel_view4").prop("files")[0];

        var form = new FormData();

        form.append("name", h_name);
        form.append("petAllowed", isPetAllowed);
        form.append("mapLink", h_location);
        form.append("address", h_address);
        form.append("phone", h_mobile1);
        form.append("phone", h_mobile2);
        form.append("email", h_email);
        form.append("prices", "[{\"key\" : \"full-board-with-ac-luxery-room-double\",\"value\" : "+
            full_board_with_ac_luxury_room_double+"},{\"key\" : \"half-board-with-ac-luxery-room-double\",\"value\" : "+
            half_board_with_ac_luxury_room_double+"},{\"key\" : \"half-board-with-ac-luxery-room-triple\",\"value\" : "+
            half_board_with_ac_luxury_room_triple+"},{\"key\" : \"full-board-with-ac-luxery-room-triple\",\"value\" : "+
            full_board_with_ac_luxury_room_triple+"}]");
        form.append("remarks", "none");
        form.append("star", h_star_rate);
        form.append("files", h_view1, "h_1.jpg");
        form.append("files", h_view2, "h_2.jpg");
        form.append("files", h_view3, "h_3.jpg");
        form.append("files", h_view4, "h_4.jpg");

        var settings = {
            "url": "http://localhost:8082/api/v1/hotel",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Authorization": "Bearer "+getKey()
            },
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": form
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
        });

    }

    search(){
        let hotelId = $("#txtSearchHotel").val();
        var settings = {
            "url": "http://localhost:8082/api/v1/hotel/"+hotelId,
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Authorization": "Bearer "+getKey()
            },
        };

        $.ajax(settings).done(function (hotelData) {
            console.log(hotelData);

            // Set response data to the HTML elements
            $("#hotel_id").val(hotelData.id);
            $("#hotel_name").val(hotelData.name);
            $("#hotel_address").val(hotelData.address);
            $("#hotel_star_rate").val(hotelData.star);
            $("#check-5").prop("checked", hotelData.petAllowed);
            $("#hotel_location").val(hotelData.mapLink);
            $("#hotel_mobile1").val(hotelData.phone[0]);
            $("#hotel_mobile2").val(hotelData.phone[1]);
            $("#hotel_email").val(hotelData.email);
            //$("#type1").val(5000)

            let imgs = ["#hotel_view1_img","#hotel_view2_img","#hotel_view3_img","#hotel_view4_img"];
            hotelData.prices.forEach(element => {
                if (element.key === "full-board-with-ac-luxery-room-double") {
                    $("#type1").val(element.value)
                }
                if (element.key === "half-board-with-ac-luxery-room-double") {
                    $("#type2").val(parseInt(element.value));
                }
                if (element.key === "full-board-with-ac-luxery-room-triple") {
                    $("#type3").val(element.value);
                }
                if (element.key === "half-board-with-ac-luxery-room-triple") {
                    $("#type4").val(element.value);
                }
            });
            let i = 0;
            for (const hotelDataKey of hotelData.images) {
                console.log(imgs[i])
                $(`${imgs[i++]}`).prop("src","data:image/jpeg;base64," +hotelDataKey)
            }

        });
    }

    update(){
        let h_name = $("#hotel_name").val();
        let h_address = $("#hotel_address").val();
        let h_star_rate = $("#hotel_star_rate").val();
        let isPetAllowed = $("#check-5:checked") ? true : false;
        let h_location = $("#hotel_location").val();
        let h_mobile1 = $("#hotel_mobile1").val();
        let h_mobile2 = $("#hotel_mobile2").val();
        let h_email = $("#hotel_email").val();
        let full_board_with_ac_luxury_room_double = $("#type1").val();
        let half_board_with_ac_luxury_room_double = $("#type2").val();
        let full_board_with_ac_luxury_room_triple = $("#type3").val();
        let half_board_with_ac_luxury_room_triple = $("#type4").val();
        let h_view1 = $("#hotel_view1").prop("files")[0];
        let h_view2 = $("#hotel_view2").prop("files")[0];
        let h_view3 = $("#hotel_view3").prop("files")[0];
        let h_view4 = $("#hotel_view4").prop("files")[0];

        if (!h_view1){
            h_view1 = this.dataURLtoFile($('#hotel_view1_img').attr('src'),"view1.jpg");
        }
        if (!h_view2){
            h_view2 = this.dataURLtoFile($('#hotel_view2_img').attr('src'),"view2.jpg");
        }
        if (!h_view3){
            h_view3 = this.dataURLtoFile($('#hotel_view3_img').attr('src'),"view3.jpg");
        }
        if (!h_view4){
            h_view4 = this.dataURLtoFile($('#hotel_view4_img').attr('src'),"view4.jpg");
        }

        var form = new FormData();

        form.append("name", h_name);
        form.append("category", "_");
        form.append("petAllowed", isPetAllowed);
        form.append("mapLink", h_location);
        form.append("address", h_address);
        form.append("phone", h_mobile1);
        form.append("phone", h_mobile2);
        form.append("email", h_email);
        form.append("prices", "[{\"key\" : \"full-board-with-ac-luxery-room-double\",\"value\" : "+
            full_board_with_ac_luxury_room_double+"},{\"key\" : \"half-board-with-ac-luxery-room-double\",\"value\" : "+
            half_board_with_ac_luxury_room_double+"},{\"key\" : \"half-board-with-ac-luxery-room-triple\",\"value\" : "+
            half_board_with_ac_luxury_room_triple+"},{\"key\" : \"full-board-with-ac-luxery-room-triple\",\"value\" : "+
            full_board_with_ac_luxury_room_triple+"}]");
        form.append("remarks", "none");
        form.append("star", h_star_rate);
        form.append("files", h_view1, "view1.jpg");
        form.append("files", h_view2, "view2.jpg");
        form.append("files", h_view3, "view3.jpg");
        form.append("files", h_view4, "view4.jpg");


        var settings = {
            "url": "http://localhost:8082/api/v1/hotel/"+$("#hotel_id").val(),
            "method": "PUT",
            "timeout": 0,
            "headers": {
                "Authorization": "Bearer "+getKey()
            },
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": form
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
        });


    }

    dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[arr.length - 1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }

}

new HotelController();