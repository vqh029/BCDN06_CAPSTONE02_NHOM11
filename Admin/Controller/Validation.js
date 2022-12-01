function Validation() {
    this.checkEmpty = function (valInput, msgErr, spanID) {
        if (valInput.trim() == "") {
            document.getElementById(spanID).innerHTML = msgErr;
            document.getElementById(spanID).style.display = "block";
            return false;
        }

        document.getElementById(spanID).innerHTML = "";
        document.getElementById(spanID).style.display = "none";
        return true;
    }

    // this.tenTrung = function (valInput, msgErr, spanID, mangTen) {
    //     var isExist = false;
    //     for (var i = 0; i < mangTen.length; i++) {
    //         if (valInput === mangTen[i]) {
    //             isExist = true;
    //             return;
    //         }
    //     }
    //     if (isExist) {
    //         document.getElementById(spanID).innerHTML = msgErr;
    //         document.getElementById(spanID).style.display = "block";
    //         return false;
    //     }

    //     document.getElementById(spanID).innerHTML = "";
    //     document.getElementById(spanID).style.display = "none";
    //     return true;
    // }

    this.checkName = function (valInput, msgErr, spanID) {
        var pattern = /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/;
        if (valInput.match(pattern)) {
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }
        document.getElementById(spanID).innerHTML = msgErr;
        document.getElementById(spanID).style.display = "block";
        return false;
    }

    this.checkPrice = function (valInput, msgErr, spanID) {
        if (valInput <= 0) {
            document.getElementById(spanID).innerHTML = msgErr;
            document.getElementById(spanID).style.display = "block";
            return false;
        }
        document.getElementById(spanID).innerHTML = "";
        document.getElementById(spanID).style.display = "none";
        return true;
    }

}