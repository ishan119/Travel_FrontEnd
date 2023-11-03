import {getKey} from "../db/db.js";

export class GuideController{
    constructor() {
        $("#btnSaveGuide").click(e=>{
            e.preventDefault();
            this.save();
        })

        $('#btnSearchGuide').click(e=>{
            e.preventDefault();
            this.search();
        })

        $("#btnUpdateGuide").click(e=>{
            e.preventDefault();
            this.update();
        });
    }

    save(){
        let g_name = $("#guide_name").val();
        let g_address = $("#guide_address").val();
        let g_contact = $("#guide_contact").val();
        let g_birthday = $("#guide_birthday").val();
        let g_man_day_value = $("#guide_man_day_value").val();
        let g_experience = $("#guide_experience").val();

        let g_id_front = $("#guide_id_front").prop("files")[0];
        let g_id_rear = $("#guide_id_rear").prop("files")[0];
        let g_pro_pic = $("#guide_profile_pic").prop("files")[0];
        let g_nic_front = $("#guide_nic-front").prop("files")[0];
        let g_nic_rear = $("#guide_nic-rear").prop("files")[0];

        var form = new FormData();
        form.append("name", g_name);
        form.append("address", g_address);
        form.append("contact", g_contact);
        form.append("birthDate", g_birthday);
        form.append("manDayValue", g_man_day_value);
        form.append("experience", g_experience);
        form.append("guideIdFront", g_id_front, "guide_id_front.jpg");
        form.append("guideIdRear", g_id_rear, "guide_id_rear.jpg");
        form.append("nicFront", g_nic_front, "guide_nic_front.jpg");
        form.append("nicRear", g_nic_rear, "guide_nic_rear.jpg");
        form.append("profilePic", g_pro_pic, "guide_profile_pic.jpg");

        var settings = {
            "url": "http://localhost:8084/api/v1/guide",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwYXNpbmR1QGdtYWlsLmNvbSIsInVzZXJOYW1lIjoiU2FtcGF0aCBCYW5kYXJhIiwidXNlclBhc3N3b3JkIjoiMzMzMzMiLCJyb2xlcyI6WyJHdWlkZV9BZG1pbiJdLCJleHAiOjE5MTM2NTAwODN9.LtjSBTNfrfmaJv-U3BufOiq5sYoPqvWQexCtNSFMIKo"
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
        var settings = {
            "url": "http://localhost:8084/api/v1/guide/"+$("#txtSearchGuide").val(),
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Authorization": "Bearer " + getKey()
            },
        };

        $.ajax(settings).done(function (response) {
            $("#guide_id").val(response.id);
            $("#guide_name").val(response.name);
            $("#guide_address").val(response.address);
            $("#guide_contact").val(response.contact);
            $("#guide_birthday").val(response.birthDate);
            $("#guide_man_day_value").val(response.manDayValue);
            $("#guide_experience").val(response.experience);

            $("#guide_profile_pic_img").prop("src",`data:image/jpg;base64,${response.profilePic}`);
            $("#guide_id_front_img").prop("src",`data:image/jpg;base64,${response.guideIdFront}`);
            $("#guide_id_rear_img").prop("src",`data:image/jpg;base64,${response.guideIdRear}`);
            $("#guide_nic-front_img").prop("src",`data:image/jpg;base64,${response.nicFront}`);
            $("#guide_nic-rear_img").prop("src",`data:image/jpg;base64,${response.nicRear}`);

            console.log(response);
        });
    }

    update(){
        let g_name = $("#guide_name").val();
        let g_address = $("#guide_address").val();
        let g_contact = $("#guide_contact").val();
        let g_birthday = $("#guide_birthday").val();
        let g_man_day_value = $("#guide_man_day_value").val();
        let g_experience = $("#guide_experience").val();

        let g_id_front = $("#guide_id_front").prop("files")[0];
        let g_id_rear = $("#guide_id_rear").prop("files")[0];
        let g_pro_pic = $("#guide_profile_pic").prop("files")[0];
        let g_nic_front = $("#guide_nic-front").prop("files")[0];
        let g_nic_rear = $("#guide_nic-rear").prop("files")[0];


        if (!g_id_front){
            g_id_front = this.dataURLtoFile($("#guide_id_front_img").attr("src"), "guide_id_front.jpg");
        }
        if (!g_id_rear){
            g_id_rear = this.dataURLtoFile($("#guide_id_rear_img").attr("src"), "guide_id_rear.jpg");
        }
        if (!g_pro_pic){
            g_pro_pic = this.dataURLtoFile($("#guide_profile_pic_img").attr("src"), "guide_profile_pic.jpg");
        }
        if (!g_nic_front){
            g_nic_front = this.dataURLtoFile($("#guide_nic-front_img").attr("src"), "guide_nic_front.jpg");
        }
        if (!g_nic_rear){
            g_nic_rear = this.dataURLtoFile($("#guide_nic-rear_img").attr("src"), "guide_nic_rear.jpg");
        }


        var form = new FormData();
        form.append("name", g_name);
        form.append("address", g_address);
        form.append("contact", g_contact);
        form.append("birthDate", g_birthday);
        form.append("manDayValue", g_man_day_value);
        form.append("experience", g_experience);
        form.append("guideIdFront", g_id_front, "guide_id_front.jpg");
        form.append("guideIdRear", g_id_rear, "guide_id_rear.jpg");
        form.append("nicFront", g_nic_front, "guide_nic_front.jpg");
        form.append("nicRear", g_nic_rear, "guide_nic_rear.jpg");
        form.append("profilePic", g_pro_pic, "guide_profile_pic.jpg");


        var settings = {
            "url": "http://localhost:8084/api/v1/guide/"+$("#guide_id").val(),
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

new GuideController();