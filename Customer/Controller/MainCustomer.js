var customerServices = new CustomerServices();
const dssp = new DanhSachSanPham();
let cart = [];

function setLocalStorage() {
    localStorage.setItem("DSSP", JSON.stringify(dssp.mangSanPham));
}

function setLocalCart() {
    localStorage.setItem("Cart", JSON.stringify(cart));
}

function getLocalStorage() {
    if (localStorage.getItem("DSSP") != null && localStorage.getItem("DSSP") != undefined) {
        dssp.mangSanPham = JSON.parse(localStorage.getItem("DSSP"));
    }
}

function getLocalCart() {
    if (localStorage.getItem("Cart") != null && localStorage.getItem("Cart") != []) {
        cart = JSON.parse(localStorage.getItem("Cart"));
        let total = 0;
        cart.forEach(item => {
            total += item.soLuong;
        })
        document.querySelector("#noti-cart").innerHTML = total;
    }
    else {
        document.querySelector("#noti-cart").innerHTML = 0;
    }
}

function layDanhSachSanPham() {
    var promise = customerServices.layDanhSachSP();

    promise.then((result) => {
        dssp.mangSanPham = [];
        result.data.map((item) => { dssp.themSP(item); })
        hienThiList(result.data);
        setLocalStorage();
    })

    promise.catch((error) => {
        console.log(error);
    })
}

layDanhSachSanPham();
getLocalStorage();
getLocalCart();

function hienThiList(mangSP) {
    var content = "";
    var count = 1;
    mangSP.map(function (sp) {
        content += `
        <div class="card" style="width: 18rem;">
            <img src="${sp.img}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${sp.name}</h5>
                <p class="card-text">${sp.desc}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Loại: ${sp.type}</li>
                <li class="list-group-item">Giá tiền: ${sp.price}</li>
                <li class="list-group-item">Màn hình: ${sp.screen}</li>
                <li class="list-group-item">Cam trước: ${sp.frontCamera}</li>
                <li class="list-group-item">Cam sau: ${sp.backCamera}</li>
            </ul>
            <div class="card-body">
                <button class="btn btn-success" onClick="themGioHang(${sp.id})">Thêm vào giỏ</button>
            </div>
        </div>`
    });

    document.querySelector("#list-product").innerHTML = content;
}



function filterSP() {
    let dsIphone = [];
    let dsSamsung = [];

    for (var i = 0; i < dssp.mangSanPham.length; i++) {
        if (dssp.mangSanPham[i].type == "iphone" || dssp.mangSanPham[i].type == "Iphone") {
            dsIphone.push(dssp.mangSanPham[i]);
        }
        else if (dssp.mangSanPham[i].type == "Samsung" || dssp.mangSanPham[i].type == "samsung") {
            dsSamsung.push(dssp.mangSanPham[i]);
        }
    }

    let valFilter = document.querySelector("#select-filterType").value;
    if (valFilter == "iphone" || valFilter == "Iphone") {
        hienThiList(dsIphone);
    }
    else if (valFilter == "samsung" || valFilter == "Samsung") {
        hienThiList(dsSamsung);
    }
    else {
        layDanhSachSanPham();
    }
}

function themGioHang(id) {
    var viTri = dssp.timViTriSP(id);
    if (viTri != -1) {
        let pos;
        if (cart.length != 0) {
            cart.forEach((item, index) => {
                if (item.sp.id == id) {
                    pos = index;
                }
            });

            if (pos != null || pos != undefined) {
                cart[pos].soLuong += 1;
            }
            else {
                var cartItem = new CartItem(dssp.mangSanPham[viTri], 1);
                cart.push(cartItem);
            }

        } else {
            var cartItem = new CartItem(dssp.mangSanPham[viTri], 1);
            cart.push(cartItem);
        }

        setLocalCart();
        getLocalCart();
    }

}

function renderCart(){
    var content = "";
    var count = 1;
    var total = 0;
    cart.map(function (item, index) {
        content += `<tr>
            <td>${count++}</td>
            <td>${item.sp.name}</td>
            <td>${item.soLuong}</td>
            <td>${item.sp.price}</td>
            <td>
                <button class="btn btn-danger" onclick="xoaKhoiGH('${index}')" >Xóa</button>
            </td>
        </tr>`
    });

    cart.forEach(item => {
        total += (item.sp.price * item.soLuong);
    })

    document.querySelector("#table-cart-content").innerHTML = content;
    document.querySelector("#total-price").innerHTML = total;
}

function xoaKhoiGH(pos){
    if(pos > -1){
        cart.splice(pos, 1);
    }
    setLocalCart();
    getLocalCart();
    renderCart();
}

function xoaGioHang() {
    cart.length = 0;
    cart = [];
    setLocalCart();
    getLocalCart();
}
