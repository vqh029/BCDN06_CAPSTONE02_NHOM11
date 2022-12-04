var customerServices = new CustomerServices();
const dssp = new DanhSachSanPham();

function setLocalStorage() {
    localStorage.setItem("DSSP", JSON.stringify(dssp.mangSanPham));
}

function getLocalStorage() {
    if (localStorage.getItem("DSSP") != null || localStorage.getItem("DSSP") != undefined) {
        dssp.mangSanPham = JSON.parse(localStorage.getItem("DSSP"));
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
                <button class="btn btn-success">Thêm vào giỏ</button>
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