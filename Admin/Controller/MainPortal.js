var adminService = new AdminServices();
const validation = new Validation();

function layDanhSachSanPham() {
    var promise = adminService.layDanhSachSP();

    promise.then((result) => {
        hienThiTable(result.data);
    })

    promise.catch((error) => {
        console.log(error);
    })
}


layDanhSachSanPham();
document.querySelector("#myModal .footer-content").innerHTML = `<button class="btn btn-success" onclick="themSanPham()">Thêm mới</button>`

function hienThiTable(mangSP) {
    var content = "";
    var count = 1;
    mangSP.map(function (sp) {
        content += `<tr>
            <td>${count++}</td>
            <td>${sp.name}</td>
            <td>${sp.price}</td>
            <td>${sp.screen}</td>
            <td>${sp.desc}</td>
            <td>${sp.type}</td>
            <td>
                <button class="btn btn-danger" onclick="xoaSP('${sp.id}')" >Xóa</button>
                <button class="btn btn-warning" onclick="capNhatSP('${sp.id}')" data-bs-toggle="modal" data-bs-target="#myModal"  >Sửa</button>
            </td>
        </tr>`
    });

    document.querySelector("#tblDanhSachSP").innerHTML = content;
}


function themSanPham() {
    var tenSP = document.getElementById("TenSP").value;
    var giaSP = document.getElementById("GiaSP").value;
    var manHinhSP = document.getElementById("ScreenSP").value;
    var camTruoc = document.getElementById("FrontCamSP").value;
    var camSau = document.getElementById("BackCamSP").value;
    var moTa = document.getElementById("MotaSP").value;
    var hinh = document.getElementById("HinhSP").value;
    var type1 = document.getElementById("typeProd1").value;
    var type2 = document.getElementById("typeProd2").value;
    var loaiSP = "";
    if (type1) {
        loaiSP = type1;
    }
    else {
        loaiSP = type2;
    }

    tenSP = tenSP.replace(/\s/g, "");
    giaSP = giaSP.replace(/\s/g, "");
    manHinhSP = manHinhSP.replace(/\s/g, "");
    camTruoc = camTruoc.replace(/\s/g, "");
    camSau = camSau.replace(/\s/g, "");
    moTa = moTa.replace(/\s/g, "");
    hinh = hinh.replace(/\s/g, "");

    var isValid = true;
    isValid &= validation.checkEmpty(tenSP, "Tên không được để trống", "TBTenSP");

    isValid &= validation.checkEmpty(giaSP, "Giá không được để trống", "TBGiaSP") &&
        validation.checkPrice(giaSP, "Giá không nhỏ hơn 0", "TBGiaSP");

    isValid &= validation.checkEmpty(manHinhSP, "Màn hình không được để trống", "TBManHinhSP");

    isValid &= validation.checkEmpty(camTruoc, "Camera trước không được để trống", "TBCamTruocSP");

    isValid &= validation.checkEmpty(camSau, "Camera sau không được để trống", "TBCamSauSP");

    isValid &= validation.checkEmpty(moTa, "Mô tả không được để trống", "TBMoTaSP");

    isValid &= validation.checkEmpty(hinh, "Hình không được để trống", "TBHinhSP");


    if (isValid) {
        var sp = new SanPham(tenSP, giaSP, manHinhSP, camSau, camTruoc, hinh, moTa, loaiSP);
        var promise = adminService.themSP(sp);

        promise.then(result => {
            layDanhSachSanPham();
        })

        promise.catch(error => {
            console.log(error);
        })

        document.getElementById("btnCloseModal").click();
        document.querySelector("form").reset();
        // document.getElementById("btnCapNhat").style.display = "block";
    }
}

$('#myModal').on('hidden.bs.modal', function () {
    $(this).find('form').trigger('reset');
    document.querySelector("#myModal .footer-content").innerHTML = "";
    document.getElementById("TBTenSP").style.display = "none";
    document.getElementById("TBGiaSP").style.display = "none";
    document.getElementById("TBManHinhSP").style.display = "none";
    document.getElementById("TBCamTruocSP").style.display = "none";
    document.getElementById("TBCamSauSP").style.display = "none";
    document.getElementById("TBMoTaSP").style.display = "none";
    document.getElementById("TBHinhSP").style.display = "none";
})


function capNhatSP(id) {
    var promise = adminService.layChiTietSP(id);

    promise.then(result => {
        document.querySelector("#myModal .footer-content").innerHTML = `<button class="btn btn-success" onclick="xacNhanCapNhatSP('${id}')">Cập nhật</button>`
        document.querySelector("#HinhSP").value = result.data.img;
        document.querySelector("#TenSP").value = result.data.name;
        document.querySelector("#MotaSP").value = result.data.desc;
        document.querySelector("#GiaSP").value = result.data.price;
        document.querySelector("#ScreenSP").value = result.data.screen;
        document.querySelector("#HinhSP").value = result.data.img;
        document.querySelector("#BackCamSP").value = result.data.backCamera;
        document.querySelector("#FrontCamSP").value = result.data.frontCamera;

        if (result.data.type == "Iphone") {
            document.querySelector("#typeProd1").checked = true;
        }
        else {
            document.querySelector("#typeProd2").checked = true;
        }
    });

    promise.catch(error =>
        console.log(error));


}

function xacNhanCapNhatSP(id) {
    var tenSP = document.getElementById("TenSP").value;
    var giaSP = document.getElementById("GiaSP").value;
    var manHinhSP = document.getElementById("ScreenSP").value;
    var camTruoc = document.getElementById("FrontCamSP").value;
    var camSau = document.getElementById("BackCamSP").value;
    var moTa = document.getElementById("MotaSP").value;
    var hinh = document.getElementById("HinhSP").value;
    var type1 = document.getElementById("typeProd1").value;
    var type2 = document.getElementById("typeProd2").value;
    var loaiSP = "";
    if (type1) {
        loaiSP = type1;
    }
    else {
        loaiSP = type2;
    }

    tenSP = tenSP.replace(/\s/g, "");
    giaSP = giaSP.replace(/\s/g, "");
    manHinhSP = manHinhSP.replace(/\s/g, "");
    camTruoc = camTruoc.replace(/\s/g, "");
    camSau = camSau.replace(/\s/g, "");
    moTa = moTa.replace(/\s/g, "");
    hinh = hinh.replace(/\s/g, "");

    var isValid = true;
    isValid &= validation.checkEmpty(tenSP, "Tên không được để trống", "TBTenSP");

    isValid &= validation.checkEmpty(giaSP, "Giá không được để trống", "TBGiaSP") &&
        validation.checkPrice(giaSP, "Giá không nhỏ hơn 0", "TBGiaSP");

    isValid &= validation.checkEmpty(manHinhSP, "Màn hình không được để trống", "TBManHinhSP");

    isValid &= validation.checkEmpty(camTruoc, "Camera trước không được để trống", "TBCamTruocSP");

    isValid &= validation.checkEmpty(camSau, "Camera sau không được để trống", "TBCamSauSP");

    isValid &= validation.checkEmpty(moTa, "Mô tả không được để trống", "TBMoTaSP");

    isValid &= validation.checkEmpty(hinh, "Hình không được để trống", "TBHinhSP");


    if (isValid) {
        var sp = new SanPham(tenSP, giaSP, manHinhSP, camSau, camTruoc, hinh, moTa, loaiSP);
        var promise = adminService.capNhatSP(id, sp);

        promise.then(result => {
            layDanhSachSanPham();
        })

        promise.catch(error => {
            console.log(error);
        })

        document.getElementById("btnCloseModal").click();
        document.querySelector("form").reset();
    }
}

function xoaSP(id) {
    adminService.xoaSP(id).then(result => {
        layDanhSachSanPham();
    })
        .catch(error => {
            console.log(error);
        })
}